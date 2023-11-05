import React, { ReactNode } from 'react'

interface WebGLSupportCheckerProps {
  children: ReactNode
  fallback: ReactNode
}

const WebGLSupportChecker: React.FC<WebGLSupportCheckerProps> = ({
  children,
  fallback
}) => {
  const isWebGLSupported = () => {
    try {
      const canvas = document.createElement('canvas')
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      )
    } catch (e) {
      return false
    }
  }

  return isWebGLSupported() ? <>{children}</> : <>{fallback}</>
}

export default WebGLSupportChecker
