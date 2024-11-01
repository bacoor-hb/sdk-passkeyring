
import { useConnect } from 'lib/useConnect'
import React from 'react'

const ButtonRegister = () => {
  const { onRegister } = useConnect()
  return (
    <div
      onClick={() => {
        onRegister()
      }}
    >
      <button>Register</button>
    </div>
  )
}

export default ButtonRegister
