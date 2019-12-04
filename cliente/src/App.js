import React, { Fragment } from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Importar Componentes
import Header from "./components/Header";
import Clientes from "./components/Clientes";
import EditarCliente from "./components/EditarCliente";
import NuevoCliente from "./components/NuevoCliente";

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
      <Router>
        <Fragment>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Clientes} />
              <Route exact path="/cliente/nuevo" component={NuevoCliente} />
              <Route exact path="/cliente/editar/:id" component={EditarCliente} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ApolloProvider>
  );
}

export default App;
