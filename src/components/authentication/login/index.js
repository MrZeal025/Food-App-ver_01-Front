import React, { Component } from 'react'
import {Form, Button} from 'react-bootstrap'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
// import error renderer
import RenderError from '../../common/Renderer/RenderErrors';

const config = {
    headers: {
        "Content-Type" : "application/json"
    }
}

export class index extends Component {

    state = {
        email: "",
        password: "",

        errors: [],
        status: false,
        message: ""
    }
    
    OnchangeHandler = (event) => {
        this.setState({
            ...this.state.account,
            [event.target.name] : event.target.value
        })
    }

    onSubmit = async (event) => {
        event.preventDefault();
        
        const email = this.state.email
        const password = this.state.password
        const body = JSON.stringify({ email, password });

        try {
            const res = await axios.post('/api/auth/login', body, config);
            localStorage.setItem('accessToken', res.data.accessToken)
            this.setState({
                message: res.data.data.message,
                status: res.data.success
            })
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

    redirectIfTrue = () => {
        const token = localStorage.getItem('accessToken');
        if(token !== null) {
            const decoded = jwt_decode(token)
            switch(decoded.type){
                case "User:Regular":
                    window.setTimeout(() => {
                        window.location.href = '/home';
                    },1000)
                    break;
                case "Admin:Super":
                    window.setTimeout(() => {
                        window.location.href = '/admin/home';
                    },1000)
                    break;
                default: break;
            }
        }
    }

    
    render() {

        this.redirectIfTrue()

        const {email, password, errors, message, status} = this.state
        return (
            <div className="">
                <div className="d-flex">
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email" 
                                placeholder="Enter email" 
                                name="email"
                                value={email}
                                onChange={this.OnchangeHandler}
                            />
                            <RenderError 
                                data={errors.length > 0 ? errors.filter(d => d.path[0] === "email") : ''}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter password" 
                                name="password"
                                value={password}
                                onChange={this.OnchangeHandler}
                            />
                            <RenderError 
                                data={errors.length > 0 ? errors.filter(d => d.path[0] === "password") : ''}
                            />
                            <p className={status ? "form-success" : "form-error"}>{message}</p>
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            type="submit"
                            onClick={this.onSubmit}
                        >
                            SIGN IN
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default index
