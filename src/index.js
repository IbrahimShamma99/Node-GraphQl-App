const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const startDatabase = require('./database');

// Create a context for holding contextual data
const context = async() => {
    const db = await startDatabase();

    return { db };
};

...

const app = express();
app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        rootValue: resolvers,
        context,
    }),
);
app.listen(4000);

console.log(`🚀 Server ready at http://localhost:4000/graphql`);