
import useOverlay from 'lib/hook/useOverlay'
import { ReactNode } from 'react'

interface MyOverlayProps {
  children: ReactNode;
  width?: string;
  height?: string;
}

const MyOverlay = ({
  height = 'calc(100% - 200px)',
  children,
  width = '500px',
}: MyOverlayProps) => {
  const { closeOverlay } = useOverlay()
  return (
    <div
      style={{
        height,
        width,
        margin: '0 auto',
        position: 'fixed',
        // top: '0px',
        // left: '0px',
        right: '20px',
        bottom: '100px',
        zIndex: 1000,
        overflowY: 'scroll',
        WebkitOverflowScrolling: 'touch',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: 20,
        maxWidth: '90%',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        color: 'black',

        // '&::-webkit-scrollbar': {
        //   display: 'none',
        // },

      }}
    >
      <div
        style={{
          width: '100%',
        }}
      >
        <div
          onClick={() => {
            closeOverlay()
          }}
          style={{
            textAlign: 'end',
            fontSize: 24,
            cursor: 'pointer',
          }}
        >
          x
        </div>
      </div>

      {children}

    </div>
  )
}

export default MyOverlay
