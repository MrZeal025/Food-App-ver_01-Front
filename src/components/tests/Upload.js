import React, { Component } from 'react';

export class Upload extends Component {

    state = {
        file: []
    }

    handleImageUpload = (e) => {
        e.preventDefault();

        if(e.target.files[0]){
            console.log(e.target.files[0])
        }
    }

    render() {
        return (
            <>
                <input type="file" id="singelImageUpload" onChange={this.handleImageUpload}/>
            </>
        )
    }
}

export default Upload
