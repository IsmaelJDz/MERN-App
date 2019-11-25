import express from "express";
// Graphql
import graphqlHTTP from "express-graphql";
import schema from "./schema";

const app = express();

app.get("/", (req, res) => {
  res.send("Todo listo");
});

class Cliente {
  constructor(id, { nombre, apellido, empresa, email }) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.empresa = empresa;
    this.email = email;
  }
}

const clienteDB = {};

// Resolver
const root = {
  cliente: () => {
    return {
      id: 10989321312,
      nombre: "Ismael",
      apellido: "Barrios",
      empresa: "Udemy",
      email: "ismael_br7@hotmail.com"
    };
  },
  crearCliente: ({ input }) => {
    const id = require("crypto")
      .randomBytes(10)
      .toString("hex");
    clienteDB[id] = input;
    return new Cliente(id, input);
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
