import mongoose from "mongoose";
import { Clientes } from "./db";
import { rejects } from "assert";

// Resolvers
export const resolvers = {
  Query: {
    getCliente: ({ id }) => {
      return new Cliente(id, clienteDB[id]);
    }
  },
  Mutation: {
    crearCliente: (root, { input }) => {
      const nuevoCliente = Clientes({
        nombre: input.nombre,
        apellido: input.apellido,
        empresa: input.empresa,
        emails: input.emails,
        edad: input.edad,
        tipo: input.tipo,
        pedidos: input.pedidos
      });

      nuevoCliente.id = nuevoCliente._id;

      return new Promise((resolve, object) => {
        nuevoCliente.save(error => {
          if (error) rejects(error);
          else resolve(nuevoCliente);
        });
      });
    }
  }
};

export default resolvers;
