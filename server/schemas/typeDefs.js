const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID!
    name: String!
  }
  
  type Query {
    book: [Book]
  }`;

  module.exports = typeDefs