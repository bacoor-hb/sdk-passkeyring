
import { ReactNode } from 'react'

interface MyOverlayProps {
  children: ReactNode;
  width?: string;
  height?: string;
}

const MyOverlay = ({
  height,
  children,
  width = '100%',
}: MyOverlayProps) => {
  return (
    <div
      style={{
        height,
        width,
        margin: '0 auto',
        position: 'fixed',
        top: '0px',
        left: '0px',
        right: '0px',
        bottom: '0px',
        zIndex: 1000,
        overflowY: 'scroll',
        WebkitOverflowScrolling: 'touch',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        // '&::-webkit-scrollbar': {
        //   display: 'none',
        // },

      }}
    >

      {children}

    </div>
  )
}

export default MyOverlay
