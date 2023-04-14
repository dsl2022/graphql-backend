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
      console.log(customers)
    return customers
  },
  customer:(_,{id})=>{
  //  const result = 
   return customers.find(customer=>customer.id===id) 
    
  //  if(result)return result;
  //   else return {isExisted:false}
  }
},
  Mutation: {
  
    addCustomer: (_,{name,email, phone}) => {    
      const newCustomer = { id: String(customers.length + 1), name, email, phone };
      customers.push(newCustomer);
      return newCustomer;
    },
    // updateCustomer: () => {      
    // },
    // deleteCustomer: () => {      
    // },
  },
};

// Create a new Apollo server instance with our schema and resolvers
const server = new ApolloServer({
    typeDefs: gql`
    type Customer{
      id:ID
      name:String
      phone:String
      email:String
      isExisted:Boolean
    }
    type Query {    
     customers:[Customer]!
     customer(id:ID!):Customer 
    }
    type Mutation {
      addCustomer(name:String!,email:String!,phone:String! ):Customer
    }
    `,
    resolvers,
  });
  
  // Start the server on port 4000
  server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
  