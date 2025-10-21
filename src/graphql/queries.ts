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
