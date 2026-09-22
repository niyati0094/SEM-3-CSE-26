const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');

const app = express();

// Define a simple GraphQL schema
const schema = buildSchema(`
    type Query {
        message: String
    }
`);
const root = {
    message: ()=> {
        return "Hello Students! Welcome to GraphQL";
    }
};

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    })
);
app.listen(3000, () => {
    console.log("GraphQL server is running on port 3000");
});
