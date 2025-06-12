import React, { useState } from "react"
import axios from 'axios'
import ModalMessage from "./ModalMessage";
import { Container, Button, Row, Col } from 'react-bootstrap'
import { Form, Card } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';

const Register = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show_modal, setShowModal] = useState({
    'modal': false,
    'title': '',
    'message': ''
  });
  const [loading, setLoading] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault(); // avoid refresh the page

    setLoading(true); // to show the loading icon
    
    const user_data = {
      username,
      email,
      password
    }

    try {
      const response = await axios.post('http://localhost:8000/api/v1/register/', user_data);

      // we show the modal with error or success
      setShowModal({
        'modal': true,
        'title': 'Successful',
        'message': 'The user '+response.data.username+' has been created.'
      });

    } catch (error) {
      const data = error.response.data;
      let error_message = '';

      for (const clave in data) {
        error_message += clave+': '+data[clave]+'\n';
      }

      // we show the modal with error or success
      setShowModal({
        'modal': true,
        'title': 'An error ocurred',
        'message': error_message
      });

    }finally{ // no matter if it was successful or failed, we return the status to false
      setLoading(false)
    }
  }

  const handleCloseModal = () => { // we pass the function to ModalMessage Component to close de modal
    setShowModal({
      'modal': false,
      'title': '',
      'message': ''
    });
  }

  return (
    <>
      <Container className="container-custom d-flex align-items-center justify-content-center">
        <Row className="justify-content-center">
          <Col md={12}>
            <Card className="text-center p-5 bg-light-dark-custom rounded">
              <Card.Body>
                <Card.Title as="h1" className="text-light mb-4"> Create an Account </Card.Title>

                <Form className="lead text-light" onSubmit={handleRegistration}>
                  <Form.Control type="text" required className="form-control mb-4" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                  <Form.Control type="email" required className="form-control mb-4" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <Form.Control type="password" required className="form-control mb-4" placeholder="Set password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  {
                    loading ? ( // if loading is true we show the loading
                      <Button type="submit" className="btn btn-info d-block mx-auto" disabled>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        <span >Loading...</span>
                      </Button>
                    ) : (
                      <Button type="submit" className="btn btn-info d-block mx-auto">Register</Button>
                    )
                  }
                </Form>

              </Card.Body>
            </Card>
          </Col>          
        </Row>
        
      </Container>

    { // if show_modal.modal is true, then we show the modal
      show_modal.modal && (
        <ModalMessage title={show_modal.title} message={show_modal.message} modal={show_modal.modal} onClose={handleCloseModal} />
      )
    }

    {/*
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 bg-light-dark p-5 rounded">
            <h3 className="text-light text-center mb-4"> Create an Account </h3>

            <form onSubmit={handleRegistration}>
              <input type="tex" className="form-control mb-4" placeholder="Enter username" value={username} onChange={(e)=> setUsername(e.target.value)}></input>
              <input type="email" className="form-control mb-4" placeholder="Enter email" value={email} onChange={(e)=> setEmail(e.target.value)}></input>
              <input type="password" className="form-control mb-4" placeholder="Set password" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
              <button type="submit" className="btn btn-info d-block mx-auto">Register</button>
            </form>
          </div>
        </div>
      </div>
    */}    
    </>
  );
}

export default Register
