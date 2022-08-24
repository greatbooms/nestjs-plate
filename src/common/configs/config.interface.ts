export interface ConfigType {
  nest: NestConfig;
  cors: CorsConfig;
  swagger: SwaggerConfig;
  graphql: GraphqlConfig;
  security: SecurityConfig;
}

export interface NestConfig {
  port: number | undefined;
}

export interface CorsConfig {
  enabled: boolean;
}

export interface SwaggerConfig {
  enabled: boolean;
  title: string | undefined;
  description: string | undefined;
  version: string | undefined;
}

export interface GraphqlConfig {
  playgroundEnabled: boolean | undefined;
  debug: boolean | undefined;
  schemaDestination: string | undefined;
  sortSchema: boolean | undefined;
}

export interface SecurityConfig {
  expiresIn: string;
  refreshIn: string;
  bcryptSaltOrRound: string | number;
}
