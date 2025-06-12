import React, { useContext, useState } from "react"
import axios from 'axios'
import ModalMessage from "./ModalMessage";
import { Container, Button, Row, Col } from 'react-bootstrap'
import { Form, Card } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../AuthProvider";

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show_modal, setShowModal] = useState({
    'modal': false,
    'title': '',
    'message': ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault(); // avoid refresh the page

    setLoading(true);
    
    const user_data = {
      username,
      password
    }

    try {
      const response = await axios.post('http://localhost:8000/api/v1/token/', user_data);

      // set the access and refresh token from django to the localStorage
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);

      setIsLoggedIn(true);

      navigate('/'); // if login is successful we go to the home page

    } catch (error) {
      const data = error.response.data;
      let error_message = '';

      for (const clave in data) {
        error_message += clave+': '+data[clave]+'\n';
      }

      // we show the modal only when there is an error
      setShowModal({
        'modal': true,
        'title': 'An error ocurred',
        'message': error_message
      });

    }finally{ // no matter if it was successful or failed, we return the status to false to remove the loading 
      setLoading(false)
    }
  }

  const handleCloseModal = () => {
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
                <Card.Title as="h1" className="text-light mb-4"> Login to our Portal </Card.Title>

                <Form className="lead text-light" onSubmit={handleLogin}>
                  <Form.Control type="text" required className="form-control mb-4" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                  <Form.Control type="password" required className="form-control mb-4" placeholder="Set password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  {
                    loading ? ( // if loading is true we show the loading
                      <Button type="submit" className="btn btn-info d-block mx-auto" disabled>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        <span >Logging...</span>
                      </Button>
                    ) : (
                      <Button type="submit" className="btn btn-info d-block mx-auto">Login</Button>
                    )
                  }
                </Form>

              </Card.Body>
            </Card>
          </Col>          
        </Row>
        
      </Container>

      {
        show_modal.modal && (
          <ModalMessage title={show_modal.title} message={show_modal.message} modal={show_modal.modal} onClose={handleCloseModal} />
        )
      }
    </>
  );
}

export default Login
