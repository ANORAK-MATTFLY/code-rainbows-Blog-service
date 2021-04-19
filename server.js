require('dotenv').config();
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const expressServer = express();

expressServer.use(bodyParser.json())
const server = new ApolloServer({
    typeDefs,
    resolvers,
    expressServer,
    playground: {
        endpoint: '/graphql',
    },
    context: (({ req, res }) => {
        return { res, req };
    }),
});

const mongoConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useFindAndModify: false,
};

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.ojnan.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`, mongoConfig).then(() =>
    server.listen(4001).then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    })
).catch(error => {
    throw new Error(error);
});
