/**
 *  Entry point for page loading, this will check the availability of the token
 *  from the login session
 * 
 *  ! If no token available user will be redirected to the login [/login]
 *  ! page for security purposes.
 */
import React  from 'react';

// utilities
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import PropTypes from 'prop-types';
import { Route , Redirect } from 'react-router-dom';

const AdminRoute = ({ component: Component, auth, ...rest }) => {

    if(auth.accessToken === null){
        window.location.href = '/login'
        return ''
    } else {
        const user = auth ? jwt_decode(auth.accessToken) : null
        return (
            <Route
                {...rest}
                render={ props => user.user_type === "Admin" ? <Component {...props} /> :  <Redirect to={{ pathname: "/login" }} />}
            />
        )
    }

};

AdminRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AdminRoute);