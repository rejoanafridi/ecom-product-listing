import React, { useState, useEffect } from "react";
import axios from "axios";

const LandingPage = () => {
	const [products, setProducts] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	useEffect(() => {
		// Fetch product data from the Fake Store API
		axios
			.get("https://fakestoreapi.com/products")
			.then((response) => {
				setProducts(response.data);
			})
			.catch((error) => {
				console.error("Error fetching products:", error);
			});
	}, []);

	// Add product to cart
	const addToCart = (product) => {
		setCartItems([...cartItems, product]);
	};

	return (
		<div className="container mx-auto py-8">
			<h2 className="text-2xl font-semibold mb-4">Product Listing</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{products.map((product) => (
					<div key={product.id} className="bg-white rounded-lg shadow p-4">
						<img
							src={product.image}
							alt={product.title}
							className="w-full h-40 object-cover mb-4 rounded"
						/>
						<h3 className="text-lg font-semibold mb-2">{product.title}</h3>
						<p className="text-gray-700 mb-2">
							{product.description.slice(0, 200)}...
						</p>
						<p className="text-blue-600 font-medium">${product.price}</p>

						{/* Add to cart button */}
						<button
							onClick={() => addToCart(product)}
							className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
						>
							Add to Cart
						</button>
					</div>
				))}
			</div>
			{/* Cart summary */}
			<div className="mt-8">
				<h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
				{cartItems.length === 0 ? (
					<p>Your cart is empty.</p>
				) : (
					<ul>
						{cartItems.map((item) => (
							<li key={item.id}>
								{item.title} - ${item.price}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default LandingPage;
