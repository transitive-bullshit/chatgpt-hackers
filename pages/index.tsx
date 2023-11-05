import * as React from 'react'
import cs from 'clsx'
// import humanizeNumber from 'human-number'
import { Source_Code_Pro } from 'next/font/google'

import * as config from '@/lib/config'
// import { HeroButton } from '@/components/HeroButton/HeroButton'
import { Button } from '@/components/Button/Button'
import { Layout } from '@/components/Layout/Layout'
import { MetaballVisualization } from '@/components/MetaballVisualization/MetaballVisualization'
import { PageHead } from '@/components/PageHead/PageHead'
import WebGLSupportChecker from '@/components/WebGLSupportChecker'
import { Metaballs } from '@/store/metaballs'

import styles from './index.module.css'

const sourceCodePro = Source_Code_Pro({ subsets: ['latin'] })

export default function HomePage({
  numMembers,
  numMembersOnline
}: {
  numMembers: string
  numMembersOnline: string
}) {
  const [hasMounted, setHasMounted] = React.useState(false)
  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  return (
    <Metaballs.Provider>
      <Layout>
        <PageHead />

        {hasMounted && (
          <WebGLSupportChecker
            fallback={
              <p>
                WebGL is not supported in your browser. Visualization is
                disabled.
              </p>
            }
          >
            <MetaballVisualization />
          </WebGLSupportChecker>
        )}

        <div className={styles.homePage}>
          <div className={styles.body}>
            <div className={cs(styles.section, styles.hero)}>
              <h1 className={cs(styles.title, sourceCodePro.className)}>
                CHATGPT HAC
                <span className={styles.reverse}>K</span>
                ERS
              </h1>

              <p className={styles.desc}>
                Join thousands of developers, researchers, and AI enthusiasts
                who are building at the cutting edge of AI
              </p>

              <div className={styles.discordInfo}>
                <p>Discord Members: {numMembers}</p>

                <p>Currently Online: {numMembersOnline}</p>
              </div>

              <Button
                href={config.discordUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                Join the Discord
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </Metaballs.Provider>
  )
}

export async function getStaticProps() {
  let numMembers = 7300
  let numMembersOnline = 100

  try {
    const discordInviteCode = config.discordUrl.split('/').pop()
    const res = await fetch(
      `https://discord.com/api/v9/invites/${discordInviteCode}?with_counts=true&with_expiration=true`
    )

    const response = await res.json()
    numMembers = parseInt(response.approximate_member_count) || 7300
    numMembersOnline = parseInt(response.approximate_presence_count) || 100
  } catch (err) {
    console.error('error fetching discord info', err)
  }

  return {
    props: {
      numMembers,
      numMembersOnline
    },
    // update counts lazily at most every 10 minutes (in seconds)
    revalidate: 10 * 60
  }
}
