//backend/src/api/payment/controllers/webhook.js

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {
  async handle(ctx) {
    const sig = ctx.request.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      ctx.request.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const payments = await strapi.entityService.findMany(
        "api::payment.payment",
        {
          filters: { sessionId: session.id },
        }
      );

      if (payments.length > 0) {
        await strapi.entityService.update(
          "api::payment.payment",
          payments[0].id,
          {
            data: { status: "مكتمل" },
          }
        );
      }
    }

    return { received: true };
  },
};
