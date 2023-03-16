export const environment = process.env.NODE_ENV || 'development'
export const isDev = environment === 'development'
export const isServer = typeof window === 'undefined'
export const isSafari =
  !isServer && /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

export const title = 'ChatGPT Hackers'
export const description =
  'Join thousands of other developers, researchers, and AI enthusiasts who are building at the cutting edge of AI!'
export const domain = 'chatgpthackers.dev'

export const author = 'Travis Fischer'
export const twitter = 'transitive_bs'
export const twitterUrl = `https://twitter.com/${twitter}`
export const discordUrl = 'https://discord.gg/v9gERj825w'
export const githubRepoUrl =
  'https://github.com/transitive-bullshit/chatgpt-hackers'
export const githubSponsorsUrl =
  'https://github.com/sponsors/transitive-bullshit'
export const copyright = `Copyright 2023 ${author}`
export const madeWithLove = 'Made with ❤️ in Brooklyn, NY'

export const port = process.env.PORT || '3000'
export const prodUrl = `https://${domain}`
export const url = isDev ? `http://localhost:${port}` : prodUrl

export const apiBaseUrl =
  isDev || !process.env.VERCEL_URL ? url : `https://${process.env.VERCEL_URL}`

// these must all be absolute urls
export const socialImageUrl = `${url}/social.jpg`
