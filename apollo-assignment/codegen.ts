import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'graphql/schema.graphql',
  documents: ['graphql/**/*.graphql'],
  generates: {
    'graphql/generated/graphql.ts': {
      plugins: [
        '@graphql-codegen/typescript',
        '@graphql-codegen/typescript-operations',
        '@graphql-codegen/typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
        skipTypename: false,
        avoidOptionals: false,
      },
    },
  },
};

export default config;
