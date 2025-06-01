import React from "react"
import Button from "./Button"

const Main = () => {

  return (
    
    <div className="container">
      <div className="p-5 text-center bg-light-dark rounded">
        <h1 className="text-light">Stock Prediciton Portal</h1>
        <p className="text-light lead">
          A website to predict stock price movements, where it takes the stock ticker and gives you 
          the prediction result. Ideal for finance enthusiasts, developers, or researchers interested in predictive market 
          analysis.
        </p>
        <Button text="login" class="btn btn-outline-info" />
      </div>
    </div>
   
  )
}

export default Main
