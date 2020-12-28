/**
 *  Entry point for page loading, this will check the availability of the token
 *  from the login session
 * 
 *  ! If no token available user will be redirected to the login [/login]
 *  ! page for security purposes.
 */
import React  from 'react';

// utilities
import { Route , Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import PropTypes from 'prop-types';

const AdminRoute = ({ component: Component, auth, ...rest }) => {
  
    if(auth.accessToken === null){
        window.location.href = '/sign-in'
        return ''
    } else {
        const user = auth ? jwt_decode(auth.accessToken) : null
        return (
            <Route
                {...rest}
                render={ props => user.type === "Admin:Super" ? <Component {...props} /> :  <Redirect to={{ pathname: "/sign-in" }} />}
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