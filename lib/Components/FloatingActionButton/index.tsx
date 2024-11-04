import HomeContainer from 'lib/Components/HomeContainer'
import useOverlay from 'lib/hook/useOverlay'
import usePopupController from 'lib/hook/usePopupController'
import React from 'react'

const FloatingActionButton = () => {
  const { openOverlay, closeOverlay } = useOverlay()

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
      }}
      className='text-red-500'
    >
      <div
        style={{
          backgroundColor: 'red',
          color: 'white',
          padding: '10px',
          borderRadius: '50%',
          cursor: 'pointer',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s',
          aspectRatio: '1',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
        }}
        onClick={() => {
          openOverlay({
            content: (
              <HomeContainer />
            ),
          })
        }}
      >
        open
      </div>
    </div>
  )
}

export default FloatingActionButton
