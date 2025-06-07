import React from "react"
import ButtonComponent from "./ButtonComponent"
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <>
      <Navbar className="navbar container pt-3 pb-3 align-items-start">
        <Container>
          <Link className="navbar-brand text-light" to="/">Stock Prediction Portal</Link>

          <Nav className="ms-auto">
            <ButtonComponent text="Login" class="btn btn-outline-info" url="login" />
            &nbsp;
            <ButtonComponent text="Register" class="btn btn-info" url="register" />
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
