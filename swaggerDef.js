module.exports = {
  info: {
    title: 'DNB User Service',
    version: '0.0.1',
    description: 'API Documentation for the DNB User Microservice',
  },
  tags: {
    user: {
      name: 'user',
      description: 'test',
    },
  },
  schemes: ['https', 'http'],
  host: 'localhost:8080',
  basePath: '/',
  apis: ['src/**/*.ts'],
};
