const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');

// GRAPHQL schema
const schema = buildSchema(`
  type Query {
    message: String
  }
`);

// Root resolver
const root = {
  message: () => 'Hello World!'
};

// Server and GraphQL endpoint
const app = express();
app.use('/graphql', express_graphql({
  schema,
  rootValue: root,
  graphiql: true
}));

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Express GraphQL Server running on ${port}`))
