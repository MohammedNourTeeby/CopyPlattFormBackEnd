// config/database.ts

export default ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: env('DATABASE_FILENAME', './data/app.db'),
    },
    useNullAsDefault: true,
    debug: false,
  },
});