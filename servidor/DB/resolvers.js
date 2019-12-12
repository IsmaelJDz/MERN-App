import mongoose from "mongoose";
import { Clientes } from "./db";
import { rejects } from "assert";

// Resolvers
export const resolvers = {
  Query: {
    getClientes: (root, { limite }) => {
      return Clientes.find({}).limit(limite);
    },
    getCliente: (root, { id }) => {
      return new Promise((resolve, object) => {
        Clientes.findById(id, (error, cliente) => {
          if (error) rejects(error);
          else resolve(cliente);
        });
      });
    }
  },
  Mutation: {
    crearCliente: (root, { input }) => {
      const nuevoCliente = Clientes({
        nombre: input.nombre,
        apellido: input.apellido,
        empresa: input.empresa,
        emails: input.emails,
        //email: input.email,
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
    },
    actualizarCliente: (root, { input }) => {
      return new Promise((resolve, object) => {
        //new: true --> si el registro no existe y le estamos pasando un objeto, si no hay ninguno con el id, crea uno nuevo
        Clientes.findOneAndUpdate(
          { _id: input.id },
          input,
          { new: true },
          (error, cliente) => {
            if (error) rejects(error);
            else resolve(cliente);
          }
        );
      });
    },
    elimnarCliente: (root, { id }) => {
      return new Promise((resolve, object) => {
        Clientes.findOneAndRemove({ _id: id }, error => {
          if (error) rejects(error);
          else resolve("Se eliminó correctamente.");
        });
      });
    }
  }
};

export default resolvers;
