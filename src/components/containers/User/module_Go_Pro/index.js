import React, { Component } from 'react';

const BZArt = process.env.PUBLIC_URL + '/assets/BZUnderConstruct.png';

export class index extends Component {
    render() {
        return (
            // design of this page is in HomePage.scss
            <div className="goProDiv">
                <img
                    src={BZArt}
                    alt="BZ under construction"
                    className="BZucArt"
                />
                <h3>Oh,no!</h3>
                <h4>This page is currently under construction.</h4>
                <a href="/home" >Back to Home</a>
            </div>
        )
    }
}

export default index
