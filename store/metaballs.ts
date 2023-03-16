import React from 'react'
import { createContainer } from 'unstated-next'

import type { MetaballViz } from '@/components/MetaballVisualization/MetaballViz'

function useMetaballs() {
  const metaballVizRef = React.useRef<MetaballViz | null>(null)

  return {
    metaballVizRef
  }
}

export const Metaballs = createContainer(useMetaballs)
