import React, { Component } from 'react'
import ProcedureList from './Procedure_Create'

export class Procedure_View extends Component {

  state = {
    procedure: [
        {
            id: Math.random(),
            method: ""
        }
    ]
  }

  handleChange = e => {
    if ( ["id", "method"].includes(e.target.name)) {
      let procedure = [...this.state.procedure];
      procedure[e.target.dataset.id][e.target.name] = e.target.value;
    }
    else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  addNewRow = e => {
    this.setState(prevState => ({
        procedure: [
        ...prevState.procedure,{
          id: Math.random(),
          method: ""
      }
      ]
    }))
  }

  deleteRow = index => {
    this.setState({
        procedure: this.state.procedure.filter(procedure => procedure.id !== index)
    })
  }

  clickOnDelete = index => {
    console.log(this.state.procedure)
    console.log(index)
    console.log(this.state.procedure.filter(procedure => procedure.id !== index))
    this.setState({
        procedure: this.state.procedure.filter(procedure => procedure.id !== index)

    })
  }

  render() {
    let {procedure} = this.state
    return (
      <div>
        <ProcedureList 
          add={this.addNewRow}
          delete={this.clickOnDelete}
          procedure={procedure}
        />
      </div>
    )
  }
}

export default Procedure_View
