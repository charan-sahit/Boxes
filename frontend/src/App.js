import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import Home from "./components/common/Home";
import Navbar from "./components/templates/Navbar";
import Boxes_dfs_center from "./components/common/Boxes_dfs_center";
import Boxes_dfs_complete from "./components/common/Boxes_dfs_complete";
import Boxes_dfs_partial from "./components/common/Boxes_dfs_partial";
import Boxes_bfs_complete from "./components/common/Boxes_bfs_complete";
import Boxes_bfs_partial from "./components/common/Boxes_bfs_partial";
import Boxes_bfs_center from "./components/common/Boxes_bfs_center";
import Boxes_area from "./components/common/Boxes_area";
import Boxes_wireframes from "./components/common/Boxes_wireframes";

const Layout = () => {
  return (
    <div>
      
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="dfs_center" element={<Boxes_dfs_center />} />
          <Route path="dfs_complete" element={<Boxes_dfs_complete />} />
          <Route path="dfs_partial" element={<Boxes_dfs_partial />} />
          <Route path="bfs_complete" element={<Boxes_bfs_complete />} />
          <Route path="bfs_partial" element={<Boxes_bfs_partial />} />
          <Route path="bfs_center" element={<Boxes_bfs_center />} />
          <Route path="area" element={<Boxes_area />} />      
          <Route path="wireframes" element={<Boxes_wireframes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
