//import { resolvers } from "./resolvers";
import { importSchema } from "graphql-import";
//import { makeExecutableSchema } from "graphql-tools";

//Parametro o ubicacion del schema dentro de la funcion importSchema
const typeDefs = importSchema("DB/schema.graphql");

//Toma 2 parametros el primero son los devs y el segundo los resolvers
//const schema = makeExecutableSchema({ typeDefs, resolvers });

export { typeDefs };
