import React, { Component } from 'react'
import AdminFrame from '../AdminFrame';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const token = localStorage.getItem('accessToken');
const config = {
    headers: {
      "Content-type": "application/json",
      "Authorization" : token
    },
};


export class index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    async componentDidMount() {
        try {
            const getAllUser = await axios.get('/api/user/all', config);   
            this.setState({
                users: getAllUser.data.data
            }) 
        } 
        catch (error) {
            console.log(error)
        }
    }

    render() {
        const { users } = this.state
        return (
            <AdminFrame>
                <div className="mainHomeDiv">
                    <div className="fullRecDiv">
                        <h3 className="mt-3 bold">User Dashboard</h3>
                        <div className="white-bg mt-4 mb-4">
                            <div className="d-flex">
                                <div className="counter flex-grow-1">
                                    <p>User Count</p>
                                    <h2>{users.length}</h2>
                                </div>
                                <div className="counter flex-grow-1">
                                    <p>Verified Account</p>
                                    <h2>{users.filter(user => user.validated === true).length }</h2>
                                </div>
                            </div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Fullname</th>
                                        <th>Email</th>
                                        <th>Type</th>
                                        <th>Verified</th>
                                        <th>Register Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map((user, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{user.fullName}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.type}</td>
                                                    <td>{user.validated ? "True" : "False"}</td>
                                                    <td>@{user.date}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </AdminFrame>
        )
    }
}

export default index
