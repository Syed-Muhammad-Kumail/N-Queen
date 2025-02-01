import { createBrowserRouter, RouterProvider} from "react-router-dom";
import './App.css';
import Table from "./Components/Table";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Table/>
    ,
  }
  ]);

function App() {
  return (
    <div className="App1">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
