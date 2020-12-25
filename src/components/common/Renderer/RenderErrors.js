import React from 'react'

function RenderError(props) {
    const { data } = props
    return (
        <small>
            <div className="form-error">
                { data.length > 0 ? data[0].message : '' }
            </div>
        </small>
    )
}

export default RenderError
