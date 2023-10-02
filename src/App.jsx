import "./App.css";
import Login from "./auth/login/Login";
import PurchaseReport from "./components/PurchaseReport";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./auth/register/Register";
import Layout from "./pages/Layout";
import Cart from "./components/cart/Cart";
import PrivateRoute from "./utils/PrivateRoute";
import New from "./pages/New";
function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Layout />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/register" element={<Register />}></Route>
					<Route path="/home" element={<Layout />}></Route>
					<Route exact element={<PrivateRoute />}>
						<Route path="/cart" element={<Cart />}></Route>
					</Route>
					<Route path="/purchase" element={<PurchaseReport />}></Route>
					<Route path="/new" element={<New />}></Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
