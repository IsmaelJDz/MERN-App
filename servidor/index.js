import express from "express";

// Graphql
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./DB/schema";
import { resolvers } from "./DB/resolvers";

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

//Middleware
server.applyMiddleware({ app });
app.listen({ port: 4000 }, () =>
  console.log(
    `El servidor esta corriendo en http://localhost:4000${server.graphqlPath}`
  )
);

//ESTE CODIGO SE UTILIZABA SOLO PARA CONECTAR GRAPHQL CON EXPRESS, AHORA SERA CON APOLLO SERVER
// app.get("/", (req, res) => {
//   res.send("Todo listo");
// });

// app.use(
//   "/graphql",
//   graphqlHTTP({
//     // que schema va a utilizar
//     schema: schema,
//     //Utilizar Graphql
//     graphiql: true
//   })
// );

// app.listen(8000, () => {
//   console.log("El servidor esta funcionando");
// });
