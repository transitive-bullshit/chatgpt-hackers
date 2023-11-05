import React from 'react';

const WebGLSupportChecker: React.FC<{ fallback: React.ReactNode }> = ({ children, fallback }) => {
  const isWebGLSupported = () => {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  };

  return isWebGLSupported() ? <>{children}</> : <>{fallback}</>;
};

export default WebGLSupportChecker;
