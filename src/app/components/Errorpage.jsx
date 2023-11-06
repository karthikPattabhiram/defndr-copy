import React from 'react'

export default function Errorpage({errorText}) {
    const errorTextP = errorText
  return (
    <div>
        <h1>{errorTextP}</h1>
    </div>
  )
}
