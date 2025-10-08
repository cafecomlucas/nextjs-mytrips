import * as S from './styles'

const Main = () => (
  <S.Wrapper>
    <S.Logo
      src="/img/logo.svg"
      alt="Desenho de um átomo e React Avançado escrito ao lado"
    />
    <S.Title>React Avançado</S.Title>
    <S.Description>
      TypeScript, ReactJS, NextJS, e Styled Components
    </S.Description>
    <S.Illustration
      src="/img/hero-illustration.svg"
      alt="Desenho de um programador de frente para uma tela com código"
    />
  </S.Wrapper>
)

export default Main
