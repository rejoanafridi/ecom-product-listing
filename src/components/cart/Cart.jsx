import axios from "axios";
import React, { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	addBuyProducts,
	buyCartItem,
	removeCartProducts,
} from "../../features/cart/cartSlice";
import { ToastContainer, toast } from "react-toastify";

function Cart() {
	const { cartProducts, cart } = useSelector((state) => state.cartItems);
	const dispatch = useDispatch();

	const [cartItems, setCartItems] = useState(cartProducts);
	const [buyItems, setBuyItems] = useState([]);
	const handleQuantityChange = (itemId, newQuantity) => {
		setCartItems((prevItems) =>
			prevItems.map((item) =>
				item.id === itemId ? { ...item, quantity: newQuantity } : item
			)
		);
	};

	const handleRemoveItem = (itemId) => {
		setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
		dispatch(removeCartProducts(itemId));
	
	};

	const calculateSubtotal = () => {
		return cartItems.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);
	};

	// buy now handlers
	const handleBuyNow = (item) => {
		setBuyItems([...buyItems, item]);

		handleRemoveItem(item.id);
		toast.success("Product Buying Successfully!!", {
			position: toast.POSITION.TOP_CENTER,
			autoClose: 1000,
			hideProgressBar: true,
		});
	};

	useEffect(() => {
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
	}, [cartItems, buyItems]);

	useEffect(() => {
		const savedPurchase = localStorage.getItem("purchase");
		if (savedPurchase) {
			setBuyItems(JSON.parse(savedPurchase));
		}
	}, []);

	useEffect(() => {
		// dispatch(buyCartItem(buyItems));yarn
		dispatch(addBuyProducts(buyItems));
		
	}, [dispatch, buyItems]);

	return (
		<div className="flex justify-center my-20">
			<div className="max-w-3xl w-full">
				{/* Cart Items List */}
				<h2 className="text-4xl font-semibold mb-4 text-center">
					Shopping Cart
				</h2>
				<div className="bg-white rounded-lg shadow-md overflow-hidden">
					{cartItems?.map((item) => (
						<div
							className="flex justify-between items-center p-4 border-b border-gray-200"
							key={item?.id}
						>
							<div className="w-16 h-16 mr-4">
								<img
									src={item?.image}
									alt="Product Image"
									className="w-full h-full object-cover"
								/>
							</div>
							<div>
								<h3 className="text-lg font-medium">
									{item?.title.slice(0, 25)}
								</h3>
								<p className="text-gray-600">
									Price: ${item?.price.toFixed(2)}
								</p>
								<div className="flex items-center mt-2">
									<button
										className="text-gray-500 hover:text-gray-700 focus:outline-none"
										onClick={() =>
											handleQuantityChange(
												item?.id,
												Math.max(1, item?.quantity - 1)
											)
										}
									>
										-
									</button>
									<input
										type="text"
										className="border border-gray-300 rounded px-2 py-1 mx-2 w-12 text-center"
										value={item?.quantity}
										onChange={(e) => {
											const newQuantity = parseInt(e.target.value, 10);
											if (!isNaN(newQuantity)) {
												handleQuantityChange(item?.id, newQuantity);
											}
										}}
									/>
									<button
										className="text-gray-500 hover:text-gray-700 focus:outline-none"
										onClick={() =>
											handleQuantityChange(item?.id, item?.quantity + 1)
										}
									>
										+
									</button>
									<button
										className="text-red-500 hover:text-red-700 focus:outline-none ml-auto"
										onClick={() => handleRemoveItem(item?.id)}
									>
										cancel
									</button>
								</div>
							</div>

							<button
								onClick={() => handleBuyNow(item)}
								className="bg-green-500 hover:bg-green-700 text-white py-2 sm:px-2  md:px-4  px-4 rounded mr-4"
							>
								Buy
							</button>
							<ToastContainer />
						</div>
					))}
					{/* Proceed to Checkout and Continue Shopping Buttons */}
					<div className="flex justify-end m-5 gap-5">
						{buyItems.length > 0 ? (
							<Link to="/purchase">
								<button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
									Order History {cart.length}
								</button>
							</Link>
						) : (
							""
						)}

						<Link to="/home">
							<button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
								Continue Shopping
							</button>
						</Link>
					</div>
				</div>

				<div>
					{/* Order Summary */}
					<h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
					<div className="bg-white rounded-lg shadow-md p-4">
						{/* Add Order Summary details here */}
						<p className="text-gray-600">Total Items: {cartItems.length}</p>
						<p className="text-gray-600">
							Subtotal: ${calculateSubtotal().toFixed(2)}
						</p>
						<p className="text-gray-600">Shipping: Free</p>
						<p className="text-gray-600">
							Total: ${calculateSubtotal().toFixed(2)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Cart;
