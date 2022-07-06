import ReactDOM from 'react-dom';

import * as S from './styles';

function Loader({ loading }) {
  if (!loading) {
    return null;
  }

  return ReactDOM.createPortal(
    <S.Overlay>
      <S.Loader />
    </S.Overlay>,
    document.getElementById('loader-root'),
  );
}

export { Loader };
