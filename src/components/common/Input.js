import React, { Component } from 'react'

export class Input extends Component {
    render() {
        const {inputName, type} = this.props
        return (
            <div className="inputHolder">
                <label>{inputName}</label>
                <input type={type}/>
            </div>
        )
    }
}

export default Input
