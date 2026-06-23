import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import axios from 'axios';

const typeDefs = gql`
  type Query {
    products(offset: Int, limit: Int): [Product!]!
  }

  type Product {
    id: Int!
    title: String!
    price: Float!
    description: String!
    category: Category!
    images: [String!]!
  }

  type Category {
    id: Int!
    name: String!
    slug: String!
    image: String!
    creationAt: String!
    updatedAt: String!
  }
`;

const resolvers = {
  Query: {
    products: async (_: any, { offset = 0, limit = 200 }: { offset?: number; limit?: number }) => {
      try {
        const response = await axios.get(
          `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
        );
        return response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch products');
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
