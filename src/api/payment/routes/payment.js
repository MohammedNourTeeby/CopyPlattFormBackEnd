//backend/src/api/payment/routes/payment.js

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/payments",
      handler: "payment.create",
      config: { policies: [] },
    },
    {
      method: "POST",
      path: "/payments/webhook",
      handler: "webhook.handle",
      config: { policies: [] },
    },
  ],
};
