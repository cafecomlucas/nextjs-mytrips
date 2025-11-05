import PlaceTemplate, { PlaceTemplateProps } from '@/templates/Place'
import { GetStaticPaths, GetStaticProps } from 'next'
import {
  GetPlacesQuery,
  GetPlaceBySlugQuery
} from '@/graphql/generated/graphql'

import createApolloClient from '@/graphql/client'
import { GET_PLACES, GET_PLACE_BY_SLUG } from '@/graphql/queries'

const Place = ({ place }: PlaceTemplateProps) => {
  return <PlaceTemplate place={place} />
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
