import LinkWrapper from '@/components/LinkWrapper'
import * as S from './styles'
import { CloseOutline } from '@emotion-icons/evaicons-outline'

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
    <>
      <LinkWrapper href="/">
        <CloseOutline size={32} aria-label="Go back to map" />
      </LinkWrapper>

      <S.Wrapper>
        <S.Container>
          <S.Heading>{name}</S.Heading>

          {html && <S.Body dangerouslySetInnerHTML={html} />}
        </S.Container>
        <S.Gallery></S.Gallery>
      </S.Wrapper>
    </>
  )
}

export default PlaceTemplate
