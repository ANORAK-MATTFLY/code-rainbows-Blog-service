require('dotenv').config();
const mongoose = require("mongoose");

const { ApolloServer } = require("apollo-server");
const { buildFederatedSchema } = require('@apollo/federation');
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
let port = process.env.PORT;
if (port == null || port == "") {
    port = 9100;
}

const mongoConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useFindAndModify: false,
};

const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }])
});


mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.ojnan.mongodb.net/blog${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`, mongoConfig).then(() =>
    server.listen(port).then(({ url }) => {
        console.log(`"https://rainbow-analytics-api.herokuapp.com/graphql"`);
    })
).catch(error => {
    throw new Error(error);
});



