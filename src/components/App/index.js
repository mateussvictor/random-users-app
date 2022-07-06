import 'antd/dist/antd.min.css';
import Global from '../../assets/styles/global';
import { UsersTable } from '../UsersTable';
import { UIContainer } from '../UIContainer';

function App() {
  return (
    <>
      <Global />

      <UIContainer>
        <UsersTable />
      </UIContainer>
    </>
  );
}

export default App;
