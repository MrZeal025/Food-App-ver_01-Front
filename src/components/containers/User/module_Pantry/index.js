import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import UserFrame from '../UserFrame';
//react bootstrap

export class index extends Component {
    render() {
        return (
            <UserFrame>
                <div className="mainHomeDiv">
                    <div className="fullRecDiv">
                        <div className="white-bg mt-4 mb-4">
                            <h1>Pantry</h1>
                            <div className="mb-10">
                                <a><button className="customButtonFormat mr-10"><h5>Recipe</h5></button></a>
                                <a><button className="customButtonFormat"><h5>Grocery List</h5></button></a>
                            </div>
                            <Container fluid>
                            <Row>
                                    <Col className="recipeIngList mb-10">
                                        <div className="flexrow-between">
                                            <h5 className="nbmargin mr-10">Recipe Name Sample Closed Sample</h5>
                                            <div className="smScreen">
                                                <button className="customButtonFormat mr-10 nrmargin-sm buttonColorBlue ntmargin nbmargin mb5-sm"><p>View List</p></button>
                                                <button className="customButtonFormat buttonColorRed ntmargin nbmargin"><p>Remove</p></button>
                                            </div>
                                        </div>
                                        <div className="IngList">
                                            {/* display none */}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="recipeIngList mb-10">
                                        <div className="flexrow-between">
                                            <h5 className="nbmargin mr-10">Recipe Name Sample Opened Sample</h5>
                                            <div className="smScreen">
                                                <button className="customButtonFormat buttonColorGray mr-10 nrmargin-sm ntmargin nbmargin mb5-sm"><p>Minimize</p></button>
                                                <button className="customButtonFormat buttonColorRed ntmargin nbmargin"><p>Remove</p></button>
                                            </div>
                                        </div>
                                        <div className="IngList">
                                            <ul>
                                                <li>1 kg rice</li>
                                                <li>2 kgs rice</li>
                                                <li>1 kg rice</li>
                                                <li>1 kg rice</li>
                                                <li>1 kg rice</li>
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                </div>
            </UserFrame>
        )
    }
}

export default index
