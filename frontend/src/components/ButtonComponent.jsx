import React from "react"
import { Link } from "react-router-dom"

const ButtonComponent = (props) => {

  return (
    <>
      <Link className={props.class} to={props.url}>{props.text}</Link>
    </>
  )
}

export default ButtonComponent
