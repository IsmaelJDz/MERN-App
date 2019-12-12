import React, { Component, Fragment } from 'react'

import { NUEVO_CLIENTE } from "../mutations";
import { Mutation } from "react-apollo";

export default class NuevoCliente extends Component {

  state = {
    cliente : {
      nombre: '',
      apellido: '',
      empresa: '',
      edad: '',
      email: '',
      tipo: '',
    },
    error: false,
    emails: []
  }

  nuevoCampo = () => {
    this.setState({
      emails: this.state.emails.concat([{ email: '' }])
    })
  }

  quitarCampo = i => {
    this.setState({
      emails: this.state.emails.filter((email, index) => i !== index)
    })
  }

  leerCampo = (i, evt) => {
    const nuevoEmail = this.state.emails.map((email, index) => {
      if(i !== index) return email;
      return {
        ...email,
        email: evt.target.value
      }
    })

    this.setState({
      emails: nuevoEmail
    })
  }

  setClientToState = e => {
    this.setState({
      cliente: {
        ...this.state.cliente,
        [e.target.name] : e.target.value
      }
    })
  }

  render() {
    const { error } = this.state;
    let respuesta = (error) ? <p className="alert alert-danger p-3 text-center">Todos los campos son obligatorios.</p> : '';
    return (
      <Fragment>
        <h2 className="text-center">Nuevo Cliente</h2>
        {respuesta}
        <div className="row justify-content-center">
          <Mutation 
            mutation={NUEVO_CLIENTE}
            onCompleted={() => this.props.history.push("/")}
          >
            { crearCliente => (

            <form className="col-md-8 m-3" 
              onSubmit={ e => {
                e.preventDefault();

                const { nombre, apellido, empresa, edad, tipo } = this.state.cliente;
                const { emails } = this.state;

                if (nombre === "" || apellido === "" || empresa === "" || edad === "" || tipo === "" ) {
                  this.setState({
                    error: true
                  });
                  return;
                }

                this.setState({
                  error: false
                })
                
                const input = {
                  nombre,
                  apellido,
                  empresa,
                  edad: Number(edad),
                  tipo,
                  emails,
                }

                crearCliente({
                  variables: {input}
                })

              }}
            >
              <div className="form-row">
                  <div className="form-group col-md-6">
                      <label>*Nombre</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Nombre"
                        name="nombre"
                        autoComplete="nada"
                        onChange={this.setClientToState}
                        />
                  </div>
                  <div className="form-group col-md-6">
                      <label>*Apellido</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Apellido"
                        name="apellido"
                        onChange={this.setClientToState}
                        />
                  </div>
              </div>
              <div className="form-row">
                  <div className="form-group col-md-12">
                      <label>*Empresa</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Empresa"
                        name="empresa"
                        onChange={this.setClientToState}
                      />
                  </div>
                  { this.state.emails.map((input, index) => (
                    <div key={index} className="form-group col-md-12">
                      <label>Correo { index + 1 }:</label>
                      <div className="input-group">
                        <input 
                          onChange={(evt) => (this.leerCampo(index, evt))}
                          type="email"
                          placeholder="email"
                          className="form-control"
                        />
                        <div className="input-group-append">
                          <button
                            onClick={()=> (this.quitarCampo(index))}
                            type="button"
                            className="btn btn-danger"
                          >&times; Eliminar </button>
                        </div>
                      </div>
                    </div>
                  )) }
                  <div className="form-group d-flex justify-content-center col-md-12">
                    <button 
                      onClick={this.nuevoCampo}
                      type="button" 
                      className="btn btn-warning"
                    > +Agregar email
                    </button>
                  </div>
              </div>
              <div className="form-row">
                  <div className="form-group col-md-6">
                      <label>*Edad</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Edad"
                        name="edad"
                        onChange={this.setClientToState}
                      />
                  </div>
                  <div className="form-group col-md-6">
                      <label>*Tipo Cliente</label>  
                      <select name="tipo" onChange={this.setClientToState} className="form-control">
                          <option value="">Elegir...</option>
                          <option value="PREMIUM">PREMIUM</option>
                          <option value="BASICO">BÁSICO</option>
                      </select>
                  </div>
              </div>
              <button type="submit" className="btn btn-success float-right">Agregar cliente</button>
            </form>
            )}
          </Mutation>
        </div> 
      </Fragment>
    )
  }
}
