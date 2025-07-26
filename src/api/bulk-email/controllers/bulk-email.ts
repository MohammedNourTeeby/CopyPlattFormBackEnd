// ./src/api/bulk-email/controllers/bulk-email.ts
import { EmailParams, sendEmail } from "../services/email-service";
import { Context } from 'koa';

export default {
  async create(ctx: Context) {
    const { subject, content, recipients } = ctx.request.body.data;

    try {
      // جلب بيانات المستخدمين
      const users = await ctx.strapi.db.query("plugin::users-permissions.user").findMany({
        where: { id: { $in: recipients } },
        select: ["email", "username"]
      });

      // إرسال البريد لكل مستخدم
      let failedCount = 0;
      for (const user of users) {
        const result = await sendEmail({
          to: user.email,
          subject,
          html: `<h1>مرحباً ${user.username}</h1>${content}`
        });

        if (!result) failedCount++;
      }

      // تحديث حالة البريد في قاعدة البيانات
      const status = failedCount === 0 ? "sent" : "failed";
      const bulkEmail = await super.create(ctx);

      ctx.response.status = 200;
      ctx.response.body = {
        success: true,
        message: `تم إرسال البريد إلى ${users.length - failedCount} مستخدمين`,
         bulkEmail
      };
    } catch (error) {
      ctx.throw(500, "فشل في إرسال البريد الإلكتروني", { error });
    }
  }
};