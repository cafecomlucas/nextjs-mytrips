import AboutTemplate, { AboutTemplateProps } from '@/templates/About'
import createApolloClient from '@/graphql/client'
import { GET_PAGES } from '@/graphql/queries'
// import { GetStaticProps } from 'next'

const AboutPage = ({ heading, body }: AboutTemplateProps) => {
  return <AboutTemplate heading={heading} body={body} />
}

export const getStaticProps = async () => {
  const client = createApolloClient()

  const response = await client.query({ query: GET_PAGES })

  // @ts-expect-error: response.data.pages is always defined
  const { pages } = response.data
  const { heading, body } = pages[0]

  return {
    props: {
      heading,
      body
    }
  }
}

export default AboutPage
