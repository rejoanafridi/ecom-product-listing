import React from "react";
import MenuItems from "./MenuItems";
import { Link } from "react-router-dom";
import { BsCart } from "react-icons/Bs";
import { useSelector } from "react-redux";
const Navbar = () => {
	const cartItem = useSelector((state) => state.cartItems);
	return (
		<header className="bg-white shadow">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<div className="flex-shrink-0">
						<a href="index.html" className="text-2xl font-bold text-gray-800">
							E-Com
						</a>
					</div>
					{/* Hamburger Menu for Mobile */}
					<div className="flex sm:hidden">
						<button
							type="button"
							className="text-gray-700 hover:text-gray-900 focus:outline-none"
						>
							<svg
								className="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
					</div>
					{/* Desktop Navigation and User Account */}
					<nav className="hidden sm:flex space-x-4">
						<div className="hidden sm:block">
							<div className="flex space-x-4">
								<MenuItems title="Home" />
								<MenuItems title="products" />
							</div>
						</div>
						{/* Search Bar */}
						<div className="relative">
							<input
								type="text"
								className="w-64 py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
								placeholder="Search products..."
							/>
							<button className="absolute top-0 right-0 h-full w-12 bg-indigo-500 text-white rounded-r-md flex items-center justify-center">
								<svg
									className="h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 19l-7-7 7-7"
									/>
								</svg>
							</button>
						</div>
						{/* Cart Summary */}
						<Link to="/cart">
							<div
								className="flex items-center mt-2
                                   "
							>
								<BsCart size={20} />{" "}
								<span className="bg-red-500 text-white rounded-full px-2 mb-2 shadow-md">
									{cartItem.cartProducts.length}
								</span>
							</div>
						</Link>

						<Link to="/login">login</Link>
					</nav>
				</div>
			</div>
			{/* Mobile Navigation Menu */}
			<div className="sm:hidden">
				<div className="px-2 pt-2 pb-3 space-y-1">
					<MenuItems title="home" />
					<MenuItems title="products" />
				</div>
			</div>
		</header>
	);
};

export default Navbar;
