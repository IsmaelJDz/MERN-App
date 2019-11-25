import express from "express";
// Graphql
import graphqlHTTP from "express-graphql";
import schema from "./schema";

const app = express();

app.get("/", (req, res) => {
  res.send("Todo listo");
});

// Resolver
const root = {
  cliente: () => {
    return {
      "id" : 10989321312,
      "nombre" : "Ismael",
      "apellido" : "Barrios",
      "empresa" : "Udemy",
      "email" : "ismael_br7@hotmail.com"
    }
  }
};

app.use(
  "/graphql",
  graphqlHTTP({
    // que schema va a utilizar
    schema: schema,
    rootValue: root,
    //Utilizar Graphql
    graphiql: true
  })
);

app.listen(8000, () => {
  console.log("El servidor esta funcionando");
});
