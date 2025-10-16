import LinkWrapper from '@/components/LinkWrapper'
import { CloseOutline } from '@emotion-icons/evaicons-outline'

import * as S from './styles'

const AboutTemplate = () => (
  <S.Content>
    <LinkWrapper href="/">
      <CloseOutline size={32} />
    </LinkWrapper>

    <S.Heading>My Trips</S.Heading>
  </S.Content>
)

export default AboutTemplate
