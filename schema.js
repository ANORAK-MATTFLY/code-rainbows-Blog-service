const { gql } = require("apollo-server");

const typeDefs = gql`
    type Page {
        # id: String!
        title: String!
        visits: Int!
    }

    type Post {
        id: String!
        authorId: String!
        title: String!
        content: String!
        thumbnail: String!
        viewCount: Int
        tags: [String!]
        releaseDate: String!
        author: Author
    }

    type Author {
        id: String!
        authorName: String!
        authorProfilePicture: String!
        posts: [Post]
    }

    type Query {
        getPostById(id : String!): Post!
        getPageCount(id: String!): Page!
        getAllPosts: [Post!]
        getAuthor(id: String!): Author!
    }

    type Mutation {
        createPage(title: String!): String!
        updatePageVisitById(id: String!): String!
        createAuthor(authorName: String!, authorProfilePicture: String!): String!
        createPost( title: String!, content: String!, thumbnail: String!, tags: [String!]): String!
        deletePost(id: String!): String!
        updatePost(id: String!, title: String!, content: String!): String!
    }
`;

module.exports = typeDefs;