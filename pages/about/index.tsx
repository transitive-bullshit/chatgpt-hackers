import * as React from 'react'
import { InferGetStaticPropsType } from 'next'

import * as config from '@/lib/config'
import { Layout } from '@/components/Layout/Layout'
import { Markdown } from '@/components/Markdown/Markdown'
import { markdownToHtml } from '@/lib/markdown-to-html'

import styles from './styles.module.css'

const markdownContent = `
## About

When ChatGPT launched at the end of 2022, the world changed for some of us. Within a few days, we had built multiple open source ChatGPT API wrappers for [Python](https://github.com/acheong08/ChatGPT) and [Node.js](https://github.com/transitive-bullshit/chatgpt-api), and these projects quickly skyrocketed to the top of GitHub Trending.

Since then, tens of thousands of developers have used our open source libraries to build amazing projects, bots, extensions, experiments, and products. We've honestly been blown away by the creativity and passion of the community, and so we decided to create a [Discord server](${config.discordUrl}) to help bring everyone together.

Our community's grown rapidly over the past few months, and we now have **over 7000 members**. We're a group of developers, researchers, hackers, and AI enthusiasts who are all excited about building at the cutting edge of AI. Open source is also very much at the heart of what we do, and our community members are always building fun / crazy / useful OSS projects that push the boundaries of what's possible with the latest advances in AI.

## Admins

- [Travis Fischer aka transitive-bullshit](https://twitter.com/transitive_bs) - [github](https://github.com/transitive-bullshit), [twitter](https://twitter.com/transitive_bs), [linkedin](https://www.linkedin.com/in/fisch2/)
- [Antonio Cheong aka acheong08](https://twitter.com/GodlyIgnorance) - [github](https://github.com/acheong08), [twitter](https://twitter.com/GodlyIgnorance), [linkedin](https://www.linkedin.com/in/acheong08/)
- [Joel Zhang aka waylaidwanderer](https://twitter.com/TheCodeOfJoel) - [github](https://github.com/waylaidwanderer), [twitter](https://twitter.com/TheCodeOfJoel), [linkedin](https://www.linkedin.com/in/joelczhang/)
- [Rawand Ahmed Shaswar aka rawa](https://twitter.com/RawandShaswar) - [github](https://github.com/rawandahmad698), [twitter](https://twitter.com/RawandShaswar), [linkedin](https://www.linkedin.com/in/rawand-ahmed-shaswar-39a945215/)

## Active Members

If you're a community member and want to be added to this section, [create a PR](https://github.com/transitive-bullshit/chatgpt-hackers) following the above format. We'll prioritize active members of the community who contribute to conversations and related open source projects.

## Selected OSS AI Projects

Here's just a few of the amazing OSS projects that have been built by our community members. If you're a member of our community and you build something cool with AI, [create a PR](https://github.com/transitive-bullshit/chatgpt-hackers), and we'll add it to the list!

### JavaScript / TypeScript

- [chatgpt](https://github.com/transitive-bullshit/chatgpt-api) [![](https://img.shields.io/github/stars/transitive-bullshit/chatgpt-api?style=social)](https://github.com/transitive-bullshit/chatgpt-api)
  - Node.js client for the official ChatGPT API 🔥
  - Also supports the unofficial API
- [node-chatgpt-api](https://github.com/waylaidwanderer/node-chatgpt-api) [![](https://img.shields.io/github/stars/waylaidwanderer/node-chatgpt-api?style=social)](https://github.com/waylaidwanderer/node-chatgpt-api)
  - ChatGPT and Bing AI clients
  - Available as a Node.js module, REST API server, and CLI
- [bing-chat](https://github.com/transitive-bullshit/bing-chat) [![](https://img.shields.io/github/stars/transitive-bullshit/bing-chat?style=social)](https://github.com/transitive-bullshit/bing-chat)
  - Node.js client for Bing's new AI-powered search

### Python

- [revChatGPT](https://github.com/acheong08/ChatGPT) [![](https://img.shields.io/github/stars/acheong08/ChatGPT?style=social)](https://github.com/acheong08/ChatGPT)
  - Most widely used ChatGPT API wrapper for Python
  - Supports both the official and unofficial APIs
- [PyChatGPT](https://github.com/rawandahmad698/PyChatGPT) [![](https://img.shields.io/github/stars/rawandahmad698/PyChatGPT?style=social)](https://github.com/rawandahmad698/PyChatGPT)
  - ️ Python client for the unofficial ChatGPT API with auto token regeneration, conversation tracking, proxy support and more ⚡
- [EdgeGPT](https://github.com/acheong08/EdgeGPT) [![](https://img.shields.io/github/stars/acheong08/EdgeGPT?style=social)](https://github.com/acheong08/EdgeGPT)
  - Reverse engineered API for Microsoft's Bing Chat

### Bots

- [chatgpt-twitter-bot](https://github.com/transitive-bullshit/chatgpt-twitter-bot) [![](https://img.shields.io/github/stars/transitive-bullshit/chatgpt-twitter-bot?style=social)](https://github.com/transitive-bullshit/chatgpt-twitter-bot)
  - Twitter bot powered by OpenAI's ChatGPT
  - [Over 90k followers](https://twitter.com/ChatGPTBot)!

### Extensions

- [chatgpt-google-extension](https://github.com/wong2/chatgpt-google-extension) [![](https://img.shields.io/github/stars/wong2/chatgpt-google-extension?style=social)](https://github.com/wong2/chatgpt-google-extension)
  - Browser extension which shows ChatGPT results alongside Google search results

### Applications

- [PandoraAI](https://github.com/waylaidwanderer/PandoraAI) [![](https://img.shields.io/github/stars/waylaidwanderer/PandoraAI?style=social)](https://github.com/waylaidwanderer/PandoraAI)
  - Web chat client powered by [node-chatgpt-api](https://github.com/waylaidwanderer/node-chatgpt-api), allowing users to easily chat with multiple AI systems while also offering support for custom presets
  - With its seamless and convenient design, PandoraAI provides an engaging conversational AI experience
- [yt-semantic-search](https://github.com/transitive-bullshit/yt-semantic-search) [![](https://img.shields.io/github/stars/transitive-bullshit/yt-semantic-search?style=social)](https://github.com/transitive-bullshit/yt-semantic-search)
  - OpenAI-powered semantic search for any YouTube playlist
  - [Demo featuring the All-In Podcast](https://all-in-on-ai.vercel.app/) 💪
- [chathub](https://github.com/chathub-dev/chathub) [![](https://img.shields.io/github/stars/chathub-dev/chathub?style=social)](https://github.com/chathub-dev/chathub)
  - All-in-one chatbot client

## License

NOTE: this community is not affiliated with OpenAI in any way.

This website is [open source](${config.githubRepoUrl}). MIT © [${config.author}](${config.twitterUrl})
`

export default function AboutPage({
  content
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <div className={styles.aboutPage}>
        <div className={styles.meta}>
          <h1 className={styles.title}>{config.title}</h1>
        </div>

        <Markdown content={content} />
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const content = await markdownToHtml(markdownContent)

  return {
    props: {
      content
    }
  }
}
