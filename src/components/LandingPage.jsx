import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";

const LandingPage = () => {
	const dispatch = useDispatch();

	const { products, isLoading, isError } = useSelector(
		(state) => state.products
	);
	const [cartItems, setCartItems] = useState([]);
	useEffect(() => {
		dispatch(fetchProducts());
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
		} else {
			// If the product doesn't exist in the cart, add it with quantity 1
			setCartItems([...cartItems, { ...product, quantity: 1 }]);
		}
	};

	useEffect(() => {
		dispatch(addToCart(cartItems));
	}, [dispatch, cartItems]);
	useEffect(() => {
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
	}, [cartItems]);
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
							{product.description.slice(0, 100)}...
						</p>
						<p className="text-blue-600 font-medium">${product.price}</p>

						{/* Add to cart button */}
						<button
							onClick={() => addToCartProduct(product)}
							className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
						>
							Add to Cart
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default LandingPage;
