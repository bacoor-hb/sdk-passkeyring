import { createContext, useState, ReactNode } from 'react'
import MyOverlay from '.'

// import useLockedBody from 'hooks/useLockedBody'
const defaultValue = {
  open: false,
  content: <></>,
  afterClose: () => {},
  height: 'calc(100% - 64px) ',
  width: '100%',
}
interface OverlayContextType {
  config: typeof defaultValue;
  openOverlay: (config: Partial<typeof defaultValue>) => void;
  closeOverlay: (callbackFunction?: () => void) => void;
}

export const OverlayContext = createContext<OverlayContextType>({
  config: defaultValue,
  openOverlay: () => {},
  closeOverlay: () => {},
})

interface OverlayProviderProps {
  children: ReactNode;
}

export const OverlayProvider = ({ children }: OverlayProviderProps) => {
  const [config, setConfig] = useState(defaultValue)

  const openOverlay = (config: Partial<typeof defaultValue>) => {
    setConfig((state) => ({ ...state, ...config, open: true }))
    document.body.style.overscrollBehavior = 'none'
    document.documentElement.style.overscrollBehavior = 'none'
  }
  const closeOverlay = (callbackFunction?: () => void) => {
    document.body.style.overscrollBehavior = 'auto'
    document.documentElement.style.overscrollBehavior = 'auto'
    callbackFunction && callbackFunction()
    config.afterClose && config.afterClose()
    setConfig(defaultValue)
  }

  return (
    <OverlayContext.Provider value={{ config, openOverlay, closeOverlay }}>
      {children}
      {config.open && (
        <MyOverlay
          height={config?.height}
          width={config?.width}

        >
          {config.content}
        </MyOverlay>
      )}
    </OverlayContext.Provider>
  )
}

export default OverlayProvider
