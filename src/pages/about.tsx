import AboutTemplate, { AboutTemplateProps } from '@/templates/About'
import createApolloClient from '@/graphql/client'
import { GET_PAGE_BY_SLUG } from '@/graphql/queries'
// import { GetStaticProps } from 'next'

const AboutPage = ({ heading, body }: AboutTemplateProps) => {
  return <AboutTemplate heading={heading} body={body} />
}

export const getStaticProps = async () => {
  const client = createApolloClient()

  const response = await client.query({
    query: GET_PAGE_BY_SLUG,
    variables: { slug: 'about' }
  })

  // @ts-expect-error: 'response' (and childrens) will be typed later
  const { page } = response.data
  if (!page) return { notFound: true }

  const { heading, body } = page

  return {
    props: {
      heading,
      body
    }
  }
}

export default AboutPage
