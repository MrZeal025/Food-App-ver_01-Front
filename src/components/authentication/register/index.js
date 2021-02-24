import React, { Component } from 'react';
import { Form, Alert, Button, Container } from 'react-bootstrap';
import axios from 'axios';
// import error renderer
import RenderErrors from '../../common/Renderer/RenderErrors';
import jwt_decode from 'jwt-decode';
// link
import { Link } from 'react-router-dom';

const config = {
    headers: {
        "Content-Type" : "application/json"
    }
}

export class index extends Component {

    state =  {
        // for validation data
        confirmPassword: "",
        match: null,
        // user data
        account : {
            fullName: "",
            email: "",
            password: "",
        },
        errors: [],
        message: "",
        success: {
            status: null,
            message: ""
        }
    }

    componentDidMount(){
        // verify if there is an existing accessToken
        document.title = "Sign up - Bitezoo"
        this.verifyAccessToken();
    }

    verifyAccessToken = () => {
        const token = localStorage.getItem('accessToken');
        if(token) {
            const hasToken =  jwt_decode(token);
            switch(hasToken.type) {
                case "User:Regular" :
                    window.location.href = "/home";
                    break;
                case "Admin:Super" :
                    window.location.href = "/admin/home";
                    break;
                default: 
                    break;
            }
        }
    }

    onChangeHandler = (event) => {
        this.setState({
            account : {
                ...this.state.account,
                [event.target.name] : event.target.value
            }
        })
    }

    validatePassword = (event) => {
        this.setState({
            ...this.state,
            [event.target.name] : event.target.value
        })

        if(this.state.account.password === event.target.value) {
            this.setState({
                match: true
            })
        } else {
            this.setState({
                match: false
            })
        }

        if(event.target.value === '') this.setState({ match: null })
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const { account } = this.state
        
        const fullName = account.fullName
        const email = account.email
        const password = account.password

        const body = JSON.stringify({ fullName, email, password });
        
        // post takes 3 parameter api, body, config
        try  {
            const res = await axios.post('/api/auth/register', body, config)
            this.setState({
                message: res.data.data.message,
                success: {
                    status: res.data.success
                }
            })
            const decoded = jwt_decode(res.data.registerToken);
            // wait for 1 second to redirect
            window.setTimeout(() => {
                window.location.href = `/verify/u/${decoded._id}/e/action`;
            },1000)
        } 
        catch (errors) {
           if(Object.keys(errors.response.data).includes('success')) {
                this.setState({
                    message: errors.response.data.data.message,
                    status: errors.response.data.success
                })
            }
            // if not success: false 
            this.setState({
                errors : errors.response.data
            })
        }
    }

    // render final function
    render() {

        const { confirmPassword, account, match, errors, success, message } = this.state

        return (
            <Container>
                {
                    success.status !== null
                    ? 
                        <Alert variant={success.status ? 'success' : 'danger'}>
                            { success.status ? success.message: 'Registration failed' }
                        </Alert>
                    :
                        <></>
                }
               <Form className="center-flex">
                    <div className="flex-row home-link">
                        <h5>Sign In</h5>
                        <a href="/" >Back to Home</a>
                    </div>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Fullname</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="what is your name"
                            name="fullName"
                            value={account.fullName} 
                            onChange={this.onChangeHandler} 
                        />
                        <RenderErrors 
                            data={errors.length > 0 ? errors.filter(d => d.path[0] === "fullName") : ''}
                        />
                    </Form.Group>

                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            name="email"
                            placeholder="Enter email" 
                            value={account.email}  
                            onChange={this.onChangeHandler}
                        />
                        <RenderErrors 
                            data={errors.length > 0 ? errors.filter(d => d.path[0] === "email") : ''}
                        />
                    </Form.Group>

                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            name="password"
                            placeholder="8 character min" 
                            value={account.password}  
                            onChange={this.onChangeHandler}
                        />
                        <RenderErrors 
                            data={errors.length > 0 ? errors.filter(d => d.path[0] === "password") : ''}
                        />
                        <p className={success.status ? "form-success" : "form-error"}>{message}</p>
                    </Form.Group>

                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                            type="password"
                            name="confirmPassword" 
                            placeholder="Confirm password" 
                            value={confirmPassword} 
                            onChange={this.validatePassword}
                        />
                        {
                            match !== null
                            ? 
                                <Alert variant={match ? 'success' : 'danger'}>
                                    { match ? "Password match" : "Password not match" }
                                </Alert>
                            :
                                <></>
                        }
                    </Form.Group>
                    <div className="flex-row"> 
                           <p className="mr-10">Already have an account?</p>
                           <Link to="/sign-in" className="sign-in-link">Click here!</Link>
                        </div>
                    <Button 
                        variant="primary" 
                        onClick={this.onSubmit}
                        disabled={!account.password || !confirmPassword}
                        className="customButtonFormat buttonColorBlue"
                    >
                        <p>Sign Up</p>
                    </Button>
                </Form>
            </Container>
        )
    }
}

export default index
