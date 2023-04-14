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
    customers:()=>{
    return customers
  },
  customer:(_,query)=>{
    console.log(query)
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
    type Customer{
      id:ID!
      name:String!
      phone:String!
      email:String!
    }
    type Query {    
     customers:[Customer]!
     customer(id:ID!):Customer!  
    }
    `,
    resolvers,
  });
  
  // Start the server on port 4000
  server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
  