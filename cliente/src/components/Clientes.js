import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { CLIENTES_QUERY } from "../queries/index";

const Contactos = () => (
  <Query query={CLIENTES_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return "Cargando...";
      if (error) return `Error: ${error.message}`;
      console.log(data.getClientes);

      return (
        <Fragment>
          <h2 className="text-center">Listado Clientes</h2>
        </Fragment>
      );
    }}
  </Query>
);

export default Contactos;
