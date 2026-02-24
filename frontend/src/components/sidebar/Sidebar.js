import "./Sidebar.css";
import { Link } from 'react-router-dom';

const Sidebar = ({sidebarOpen, closeSidebar}) => {
    return (
        <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
            <div className="sidebar__title">
                {/* <div className="sidebar__img">
                    <img src={logo} alt="logo"/>
                </div> */}
                <i 
                className="fa fa-times"
                id="sidebarIcon"
                onClick={() => closeSidebar()}>
                </i>
            </div>

            <div className="sidebar__menu">
                <div className="sidebar__link1 active_menu_link">
                    <i className="fa fa-home"></i>
                    <a href="/">Home</a>
                </div>
                <div className="sidebar__link">
                    <Link to="/add">Add User</Link>
                </div>
                {/* <div className="sidebar__link">
                    <Link to="/update">Update User</Link>
                </div>
                <div className="sidebar__link">
                    <Link to="/delete">Delete User</Link>
                </div> */}
                <div className="sidebar__link">
                    <Link to="/logs">Logs</Link>
                </div>
            </div>
        </div>
    )
}
export default Sidebar;