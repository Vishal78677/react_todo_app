import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Todo from './Simple Todo/components/Todo';

function App() {
  return (
    <>
      <ToastContainer />
      <Todo />
    </>
  );
}

export default App;
