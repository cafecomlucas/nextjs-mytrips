import LinkWrapper from '@/components/LinkWrapper'
import * as S from './styles'
import { CloseOutline } from '@emotion-icons/evaicons-outline'
import Image from 'next/image'

export type PlaceTemplateProps = {
  place: {
    name: string
    description?: {
      html: string | TrustedHTML
    }
    gallery: {
      url: string
    }[]
  }
}

const PlaceTemplate = ({ place }: PlaceTemplateProps) => {
  const { name, description, gallery } = place
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
          <S.Gallery>
            {gallery.map(({ url }, index) => (
              <Image
                key={`photo-${index}`}
                src={url}
                alt={name}
                sizes="100vw"
                width={1000}
                height={600}
                quality={75}
              />
            ))}
          </S.Gallery>
        </S.Container>
      </S.Wrapper>
    </>
  )
}

export default PlaceTemplate
