// src/api/notification/services/notification.js
const { send } = require("@strapi/helper-plugin");

module.exports = {
  async create(data, { user } = {}) {
    const notification = await super.create(data, { user });

    if (data.data.sendEmail && data.data.emailContent) {
      const users = await strapi.entityService.findMany(
        "plugin::users-permissions.user",
        {
          filters: { id: { $in: data.data.users_permissions_users } },
          fields: ["email"],
        }
      );

      const emails = users.map((user) => user.email);

      await send({
        to: emails.join(","),
        from: "mohammednourteeby@gmail",
        subject: "إشعار جديد",
        text: data.data.emailContent,
        html: `<p>${data.data.emailContent}</p>`,
      });
    }

    return notification;
  },
};
