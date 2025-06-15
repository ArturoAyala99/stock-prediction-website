import React from "react"
import ButtonComponent from "./ButtonComponent"
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

const Main = () => {

  return (
    
    <>
      <Container className="container-custom d-flex align-items-center justify-content-center">
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="text-center p-5 bg-light-dark-custom rounded">
              <Card.Body>
                <Card.Title as="h1" className="text-light">Stock Prediction Portal</Card.Title>

                <Card.Text className="lead text-light">
                  A website to predict stock price movements, where it takes the stock ticker and gives you 
                  the prediction result. Ideal for finance enthusiasts, developers, or researchers interested in predictive market 
                  analysis.
                </Card.Text>

                <ButtonComponent text="Explore now" class="btn btn-outline-info" url="dashboard" />
              </Card.Body>
            </Card>

          </Col>

        </Row>
      </Container>

      {/*
      <div className="container">
        <div className="p-5 text-center bg-light-dark rounded">
          <h1 className="text-light">Stock Prediciton Portal</h1>
          <p className="text-light lead">
            A website to predict stock price movements, where it takes the stock ticker and gives you 
            the prediction result. Ideal for finance enthusiasts, developers, or researchers interested in predictive market 
            analysis.
          </p>
          <Button text="login" class="btn btn-outline-info" url="login" />
        </div>
      </div>
      */}
   </>
  )
}

export default Main
