const { GraphQLServerLambda } = require("graphql-yoga");
const fs = require("fs");

const typeDefs = fs.readFileSync("./schema.gql").toString('utf-8');

const resolvers = {
    Query: {
        getUser: require("./resolver/Query/getUser").func
    },
    Mutation: {
        createUser: require("./resolver/Mutation/createUser").func
    }
};

const lambda = new GraphQLServerLambda({
    typeDefs,
    resolvers
});

exports.server = lambda.graphqlHandler;
exports.playground = lambda.playgroundHandler;
