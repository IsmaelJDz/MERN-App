import React from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

//Importar Componentes
import Header from "./components/Header";
import Clientes from "./components/Clientes";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  onError: ({ netWorkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", netWorkError);
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <div className="container">
        <Clientes />
      </div>
    </ApolloProvider>
  );
}

export default App;
