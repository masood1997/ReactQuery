import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error = () => {
    const error = useRouteError();
    console.log(error.stack);
  return (
    <div>{error.message}</div>
  )
}

export default Error