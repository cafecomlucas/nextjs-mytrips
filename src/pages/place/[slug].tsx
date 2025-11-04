import { GetStaticPaths, GetStaticProps } from 'next'
import {
  GetPlacesQuery,
  GetPlaceBySlugQuery
} from '@/graphql/generated/graphql'

import createApolloClient from '@/graphql/client'
import { GET_PLACES, GET_PLACE_BY_SLUG } from '@/graphql/queries'

export type PlaceTemplateProps = {
  place: {
    name: string
    description?: {
      html: string | TrustedHTML
    }
  }
}

const Place = ({ place }: PlaceTemplateProps) => {
  const { name, description } = place
  const html = description && { __html: description.html }

  return (
    <>
      <h1>{name}</h1>
      {html && <div dangerouslySetInnerHTML={html}></div>}
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = createApolloClient()
  const { data } = await client.query<GetPlacesQuery>({
    query: GET_PLACES
  })

  let paths
  if (data && data.places.length > 0) {
    paths = data?.places?.map(({ slug }) => ({
      params: { slug }
    }))
  } else {
    paths = [{ params: { slug: '' } }]
  }

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = createApolloClient()
  const { data } = await client.query<GetPlaceBySlugQuery>({
    query: GET_PLACE_BY_SLUG,
    variables: { slug: params?.slug }
  })

  if (!data?.place) return { notFound: true }

  const { place } = data

  return {
    props: {
      place
    }
  }
}

export default Place
