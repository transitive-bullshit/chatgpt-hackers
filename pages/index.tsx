import * as React from 'react'
import cs from 'clsx'
import { Source_Code_Pro } from 'next/font/google'

import * as config from '@/lib/config'
// import { HeroButton } from '@/components/HeroButton/HeroButton'
import { Button } from '@/components/Button/Button'
import { Layout } from '@/components/Layout/Layout'
import { MetaballVisualization } from '@/components/MetaballVisualization/MetaballVisualization'
import { PageHead } from '@/components/PageHead/PageHead'
import { Metaballs } from '@/store/metaballs'

import styles from './index.module.css'

const sourceCodePro = Source_Code_Pro({ subsets: ['latin'] })

export default function HomePage(discordInfo: { discordInfo: { members: string; currentlyOnline: string } }) {
  const [hasMounted, setHasMounted] = React.useState(false)
  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  return (
    <Metaballs.Provider>
      <Layout>
        <PageHead />

        {hasMounted && <MetaballVisualization />}

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

              <Button
                href={config.discordUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                Join the Discord
              </Button>
              <p className={styles.discordInfo}>
                Discord Members: {discordInfo.discordInfo.members}<br />
                Currently Online: {discordInfo.discordInfo.currentlyOnline}
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </Metaballs.Provider>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://discord.com/api/v9/invites/5A896vcp?with_counts=true&with_expiration=true')
  const response = await res.json()
  const members = response.approximate_member_count;
  const discordInfo = {
    members: response.approximate_member_count,
    currentlyOnline: response.approximate_presence_count
  }
  return {
    props: {
      discordInfo
    },
  }
}