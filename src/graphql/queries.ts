import { gql } from '@apollo/client'

export const GET_PAGES = gql`
  query getPages {
    pages {
      heading
      body {
        html
      }
    }
  }
`

export const GET_PAGE_BY_SLUG = gql`
  query getPageBySlug($slug: String!) {
    page(where: { slug: $slug }) {
      heading
      body {
        html
      }
    }
  }
`
