import * as S from './styles';

function UIContainer({ children }) {
  return (
    <S.Container>
      {children}
    </S.Container>
  );
}

export { UIContainer };
