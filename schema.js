const { gql } = require("apollo-server");

const typeDefs = gql`
    type Post {
    id: String!
    title: String!
    content: String!
    viewCount: Int
    tags: [String!]
    }

    type Query {
    getPostById(id:ID): Post!
    getPost: Post!
    }

    type Mutation {
        createPost( title: String!, content: String!): String!
        deletePost(id: String!): String!
    }
`;

module.exports = typeDefs;