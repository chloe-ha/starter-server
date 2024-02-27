import env from '/config';

export const dbConnection = {
  url: `mongodb://${env.DB_HOST}:${env.DB_PORT}/${env.DB_DATABASE}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
