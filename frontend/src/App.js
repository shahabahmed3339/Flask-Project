
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import {useState} from 'react';
import WebCam from './components/Camera/WebCam';
import WebCamUpdate from './components/Camera/WebCam-Update';
import Logs from './components/Logs/Logs';
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';
import Main from './components/main/Main'

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  }

  const closeSidebar = () => {
    setSidebarOpen(false);
  }

  return (
    <Router>
      <div className="container1">
        <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar}/>
      <div className="main1">
        <Route exact path="/" component={Main} />
        <Route exact path="/add" component={WebCam} />
        <Route exact path="/update/:id" component={WebCamUpdate} />
        <Route exact path="/logs" component={Logs} />
      </div>
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}/>
      </div>
    </Router>
  );
}

export default App;
