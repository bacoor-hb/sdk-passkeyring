import { useConnect } from '@panhasilva/main'
import React from 'react'

const ButtonConnect = () => {
  const { onConnect } = useConnect()
  return (
    <div
      className='text-red-500'
      onClick={() => {
        onConnect()
      }}
    >
      Connect
    </div>
  )
}

export default ButtonConnect
