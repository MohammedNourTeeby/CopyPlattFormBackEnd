module.exports = {
  async create(data, { user } = {}) {
    // استدعاء الدالة الأصلية لتسجيل المستخدم
    const newUser = await super.create(data, { user });

    // إنشاء إشعار ترحيبي للمستخدم الجديد
    await strapi.entityService.create("api::notification.notification", {
      data: {
        message: "مرحبًا بك في منصة الاعتماد العربي ! نتمنى لك تجربة رائعة.",
        type: "general",
        read: false,
        users_permissions_users: [newUser.documentId], // ربط الإشعار بالمستخدم عبر documentId
      },
    });

    return newUser;
  },
};
