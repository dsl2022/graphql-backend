const { ApolloServer, gql } = require('apollo-server');

// Some mock data for testing purposes
const customers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '555-1234',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    phone: '555-5678',
  },
];

// Define the resolvers for our GraphQL server
const resolvers = {
  Query: {
    customers: () => customers,
    customer: (_, { id }) => customers.find(customer => customer.id === id),
  },
  Mutation: {
    addCustomer: (_, { name, email, phone }) => {
      const newCustomer = { id: String(customers.length + 1), name, email, phone };
      customers.push(newCustomer);
      return newCustomer;
    },
    updateCustomer: (_, { id, name, email, phone }) => {
      const customerIndex = customers.findIndex(customer => customer.id === id);
      if (customerIndex === -1) {
        throw new Error(`Customer with ID ${id} not found`);
      }
      const updatedCustomer = { ...customers[customerIndex], name, email, phone };
      customers[customerIndex] = updatedCustomer;
      return updatedCustomer;
    },
    deleteCustomer: (_, { id }) => {
      const customerIndex = customers.findIndex(customer => customer.id === id);
      if (customerIndex === -1) {
        throw new Error(`Customer with ID ${id} not found`);
      }
      const deletedCustomer = customers.splice(customerIndex, 1)[0];
      return deletedCustomer;
    },
  },
};

// Create a new Apollo server instance with our schema and resolvers
const server = new ApolloServer({
    typeDefs: gql`
      type Customer {
        id: ID!
        name: String!
        email: String!
        phone: String!
      }
  
      type Query {
        customers: [Customer!]!
        customer(id: ID!): Customer
      }
  
      type Mutation {
        addCustomer(name: String!, email: String!, phone: String!): Customer!
        updateCustomer(id: ID!, name: String, email: String, phone: String): Customer!
        deleteCustomer(id: ID!): Customer!
      }
    `,
    resolvers,
  });
  
  // Start the server on port 4000
  server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
  