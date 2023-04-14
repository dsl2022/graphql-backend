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
    hello:()=>{
    return 'hello world!'
  },
  hello2:()=>{
    return JSON.stringify({foo:"bar"})
  },
  hello4:()=>{
    return "4"
  }

},
  // Mutation: {
  
  //   addCustomer: () => {      
  //   },
  //   updateCustomer: () => {      
  //   },
  //   deleteCustomer: () => {      
  //   },
  // },
};

// Create a new Apollo server instance with our schema and resolvers
const server = new ApolloServer({
    typeDefs: gql`
    type Query {
     hello:String!
     hello2:String
     hello3:[String]!
     hello4:Int   
    }
    `,
    resolvers,
  });
  
  // Start the server on port 4000
  server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
  