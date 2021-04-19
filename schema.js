const { gql } = require("apollo-server");

const typeDefs = gql`
    type Post {
    id: String!
    title: String!
    content: String!
    viewCount: Int
    tags: [String!]
    }

    type Author {
        id: String!
        authorName: String!
        authorProfilePicture: String!
    }

    type Query {
    getPostById(id : String!): Post!
    getPosts: [Post!]
    }

    type Mutation {
        createPost( title: String!, content: String!): String!
        deletePost(id: String!): String!
        updatePost(id: String!, title: String!, content: String!): String!
    }
`;

module.exports = typeDefs;