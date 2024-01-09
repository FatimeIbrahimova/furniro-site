import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";

const MainRoot = () => {
	return (
		<div>
			<Navbar />
			<Outlet />
			<Footer />
			<ToastContainer />
		</div>
	);
};

export default MainRoot;
