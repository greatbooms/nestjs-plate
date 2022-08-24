import type { ConfigType } from './config.interface';

export default (): ConfigType => ({
  nest: {
    port: parseInt(process.env.PORT!, 10) || 3100,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: process.env.SWAGGER_TITLE,
    description: process.env.SWAGGER_DESCRIPTION,
    version: process.env.SWAGGER_VERSION,
  },
  graphql: {
    playgroundEnabled: process.env.PLAYGROUND_ENABLED === 'true',
    debug: process.env.DEBUG === 'true',
    schemaDestination: process.env.SCHEMA_DESTINATION,
    sortSchema: process.env.SORT_SCHEMA === 'true',
  },
  security: {
    expiresIn: '2m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
  },
});
