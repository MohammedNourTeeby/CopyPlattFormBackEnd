// ./src/routes/bulk-email.js
module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/bulk-emails',
      handler: 'bulk-email.create',
      config: {
        policies: [],
        middlewares: []
      }
    }
  ]
};