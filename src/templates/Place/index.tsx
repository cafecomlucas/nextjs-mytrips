import * as S from './styles'

export type PlaceTemplateProps = {
  place: {
    name: string
    description?: {
      html: string | TrustedHTML
    }
  }
}

const PlaceTemplate = ({ place }: PlaceTemplateProps) => {
  const { name, description } = place
  const html = description && { __html: description.html }
  return (
    <S.Wrapper>
      <h1>{name}</h1>
      {html && <div dangerouslySetInnerHTML={html}></div>}
    </S.Wrapper>
  )
}

export default PlaceTemplate
