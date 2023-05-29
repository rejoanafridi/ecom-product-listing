import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";
import Loader from "../utils/Loader";
import Pagination from "./Pagination";
import { ToastContainer, toast } from "react-toastify";

const LandingPage = () => {
	const dispatch = useDispatch();

	const { products, isLoading, isError } = useSelector(
		(state) => state.products
	);
	const { search } = useSelector((state) => state.filter);
	const [cartItems, setCartItems] = useState([]);
	const [sortType, setSortType] = useState("");

	const sortProducts = (sortType) => {
		const sortedProducts = [...products];
		if (sortType === "lowToHigh") {
			sortedProducts.sort((a, b) => a.price - b.price);
		} else if (sortType === "highToLow") {
			sortedProducts.sort((a, b) => b.price - a.price);
		}
		return sortedProducts;
	};

	useEffect(() => {
		// checking products
		if (products.length === 0) {
			dispatch(fetchProducts());
		}
	}, [dispatch]);

	// Add product to cart
	const addToCartProduct = (product) => {
		const existingProduct = cartItems.find((item) => item.id === product.id);
		if (existingProduct) {
			// If the product already exists in the cart, update the quantity
			const updatedCartItems = cartItems.map((item) => {
				if (item.id === product.id) {
					return { ...item, quantity: item.quantity + 1 };
				}
				return item;
			});

			setCartItems(updatedCartItems);
			toast.success("Added to the Cart!", {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 1000,
				hideProgressBar: true,
			});
		} else {
			// If the product doesn't exist in the cart, add it with quantity 1
			setCartItems([...cartItems, { ...product, quantity: 1 }]);
			toast.success("Added to the Cart", {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 1000,
				hideProgressBar: true,
			});
		}
	};

	useEffect(() => {
		dispatch(addToCart(cartItems));
	}, [dispatch, cartItems]);
	useEffect(() => {
		const savedCartItems = localStorage.getItem("cartItems");
		if (savedCartItems) {
			setCartItems(JSON.parse(savedCartItems));
		}
	}, []);
	let content;
	// what to render
	if (isLoading) {
		content = <Loader></Loader>;
	}

	if (!isLoading && isError) {
		content = <p>Something is wrong!</p>;
	}

	if (!isError && !isLoading && products.length > 0) {
		content = (
			<>
				{sortProducts(sortType)
					.filter((product) =>
						product.title.toLowerCase().includes(search.toLowerCase())
					)
					.map((product) => (
						<div
							key={product.id}
							className="bg-white rounded-lg shadow p-4 flex flex-col justify-between "
						>
							<img
								src={product.image}
								alt={product.title}
								className="w-full h-40 object-cover mb-4 rounded"
							/>
							<div className="content">
								<h3 className="text-lg font-semibold mb-2">{product.title}</h3>
								<p className="text-gray-700 mb-2">
									{product.description.slice(0, 50)}...
								</p>
								<p className="text-indigo-600 font-medium">${product.price}</p>
							</div>

							{/* Add to cart button */}
							<button
								onClick={() => addToCartProduct(product)}
								className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
							>
								Add to Cart
							</button>
						</div>
					))}
			</>
		);
	}

	return (
		<div className="container mx-auto py-8">
			<div className="flex md:justify-between justify-between mb-5">
				<h2 className="md:text-2xl text-lg font-semibold mb-4">
					Product Listing
				</h2>
				<div className="flex items-center space-x-4">
					<label className="text-gray-700 hidden md:block">Sort by:</label>
					<select
						id="sort"
						className="py-2 px-4 border sm:px-1 border-gray-300 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 rounded-md"
						value={sortType}
						onChange={(e) => setSortType(e.target.value)}
					>
						<option value="">Select Type</option>
						<option value="lowToHigh">Price: Low to High</option>
						<option value="highToLow">Price: High to Low</option>
					</select>
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{content}
				<ToastContainer />
			</div>
			{/* <Pagination /> */}
		</div>
	);
};

export default LandingPage;
