import {
  RouterProvider,
} from "react-router-dom";
import routes  from './routes';
import './App.css';

const App =()=> {
  return (
    <RouterProvider router={routes} />
  );
}
export default App;

