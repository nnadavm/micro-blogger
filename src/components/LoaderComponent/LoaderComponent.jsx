import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
import './LoaderComponent.css'

function LoaderComponent({alignTop}) {

  return (
    <div className={alignTop ? 'loaderTop' : 'loader'}>
        <Spinner animation="border" variant="light" />
    </div>
  )
}

export default LoaderComponent