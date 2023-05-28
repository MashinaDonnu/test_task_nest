import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

export default (): ApolloDriverConfig => ({
  driver: ApolloDriver,
  autoSchemaFile: 'schema.gql',
  sortSchema: true,
  playground: true,
});
