import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavDropdown } from 'react-bootstrap';
import { logout } from "../../../redux/actions/authActions";

class Logout extends Component {
  render() {
    return (
      <>
        {/* ! HREF attribute is important to reset the page to the landing page */}
        {/* remove will cause and error */}
        <NavDropdown.Item href="/" onClick={this.props.logout}>Sign Out</NavDropdown.Item>
      </>
    );
  }
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Logout);
