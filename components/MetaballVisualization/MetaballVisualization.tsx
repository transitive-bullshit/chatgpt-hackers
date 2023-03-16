import React from 'react'
import { useMeasure } from 'react-use'

import { Metaballs } from '@/store/metaballs'

import { MetaballViz } from './MetaballViz'
import styles from './styles.module.css'

export const MetaballVisualization: React.FC = () => {
  const { metaballVizRef } = Metaballs.useContainer()
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  const defaultWidth = typeof window !== 'undefined' ? window.innerWidth : 1280
  const defaultHeight = typeof window !== 'undefined' ? window.innerHeight : 720
  const [measureRef, { width = defaultWidth, height = defaultHeight }] =
    useMeasure()

  React.useEffect(() => {
    if (!canvasRef.current) return

    const metaballViz = new MetaballViz({
      canvas: canvasRef.current
    })
    metaballVizRef.current = metaballViz
    metaballViz.animate()

    return () => metaballViz.destroy()
  }, [canvasRef, metaballVizRef])

  React.useEffect(() => {
    if (!metaballVizRef?.current) return
    metaballVizRef.current.onResize()
  }, [width, height, metaballVizRef])

  const onMouseMove = React.useCallback(
    (event: any) => {
      if (!metaballVizRef?.current) return
      metaballVizRef.current.onMouseMove(event)
      canvasRef.current?.focus()
    },
    [metaballVizRef, canvasRef]
  )

  return (
    <div className={styles.metaballVisualization} ref={measureRef}>
      <canvas
        width={width}
        height={height}
        ref={canvasRef}
        onMouseMoveCapture={onMouseMove}
        onTouchMoveCapture={onMouseMove}
      />
    </div>
  )
}
