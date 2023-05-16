import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./auth/login/Login";
import LandingPage from "./components/LandingPage";
import PurchaseReport from "./components/PurchaseReport";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./auth/register/Register";
import Navbar from "./components/navbar/Navbar";
import Layout from "./pages/Layout";
import Cart from "./components/cart/Cart";
function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Login />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/register" element={<Register />}></Route>
					<Route path="/home" element={<Layout />}></Route>
					<Route path="/cart" element={<Cart />}></Route>
					<Route path="/purchase" element={<PurchaseReport />}></Route>

				</Routes>
			</Router>
		</>
	);
}

export default App;
