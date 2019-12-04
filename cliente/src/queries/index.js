import gql from "graphql-tag";

export const CLIENTES_QUERY = gql`
  query {
    getClientes {
      id
      nombre
      apellido
      empresa
    }
  }
`;
