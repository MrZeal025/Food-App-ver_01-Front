import React, { Component } from 'react'

export class ErrorRenderer extends Component {
    render() {
        const { path, desiredPath, message } = this.props
        return (
            <>
                <span>{ path === desiredPath ? message !== '' ? message : '' : '' }</span>
            </>
        )
    }
}

export default ErrorRenderer
