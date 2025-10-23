import PageTemplate, { PageTemplateProps } from '@/templates/Page'
import createApolloClient from '@/graphql/client'
import { GET_PAGE_BY_SLUG, GET_PAGES } from '@/graphql/queries'
import { GetStaticProps, GetStaticPaths } from 'next'

const Page = ({ heading, body }: PageTemplateProps) => {
  return <PageTemplate heading={heading} body={body} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = createApolloClient()
  const response = await client.query({
    query: GET_PAGES
  })

  // @ts-expect-error: 'pages' will be typed later
  const { pages } = response.data
  // @ts-expect-error: 'slug' will be typed later
  const paths = pages.map(({ slug }) => ({
    params: { slug }
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = createApolloClient()
  const response = await client.query({
    query: GET_PAGE_BY_SLUG,
    variables: { slug: `${params?.slug}` }
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

export default Page
