import LinkWrapper from '@/components/LinkWrapper'
import { CloseOutline } from '@emotion-icons/evaicons-outline'

import * as S from './styles'

const AboutTemplate = () => (
  <S.Content>
    <LinkWrapper href="/">
      <CloseOutline size={32} />
    </LinkWrapper>

    <S.Heading>My Trips</S.Heading>

    <S.Body>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a eros
        placerat, aliquet metus sit amet, ullamcorper purus. Pellentesque
        habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Class aptent taciti sociosqu ad litora torquent per conubia
        nostra, per inceptos himenaeos.
      </p>
    </S.Body>
  </S.Content>
)

export default AboutTemplate
