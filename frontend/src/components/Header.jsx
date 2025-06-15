import React from "react"
import ButtonComponent from "./ButtonComponent"
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import { useContext } from "react";

const Header = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    // we remove the access and refresh token from the localStorage to logout
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    setIsLoggedIn(false);

    navigate('/login');
  }

  return (
    <>
      <Navbar className="navbar container pt-3 pb-3 align-items-start">
        <Container>
          <Link className="navbar-brand text-light" to="/">Stock Prediction Portal</Link>

          <Nav className="ms-auto">
            {
              isLoggedIn ? (
                <>
                  <ButtonComponent text="Dashboard" class="btn btn-outline-info" url="dashboard" />
                  &nbsp;
                  <Button type="button" className="btn btn-danger" onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <>
                  <ButtonComponent text="Login" class="btn btn-outline-info" url="login" />
                  &nbsp;
                  <ButtonComponent text="Register" class="btn btn-info" url="register" />
                </>
              )
            }
          </Nav>
          
        </Container>
      </Navbar>

    {/*
      <nav className="navbar container pt-3 pb-3 align-items-start">
        <Link className="navbar-brand text-light" to="/">Stock Prediction Portal</Link>

        <div>
          <ButtonComponent text="Login" class="btn btn-outline-info" url="login" />
          &nbsp;
          <ButtonComponent text="Register" class="btn btn-info" url="register" />
        </div>
      </nav>

      */
    }
    </>
  )
}

export default Header
