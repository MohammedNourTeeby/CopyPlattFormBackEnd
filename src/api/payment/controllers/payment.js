//backend/src/api/payment/controllers/payment.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {
  async create(ctx) {
    const { items, userId } = ctx.request.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.name },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    const payment = await strapi.entityService.create("api::payment.payment", {
      data: {
        amount: items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        currency: "usd",
        status: "معلق",
        sessionId: session.id,
        users_permissions_user: userId,
      },
    });

    return { sessionId: session.id };
  },
};
