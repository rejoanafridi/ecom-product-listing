import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const PurchaseReport = () => {
	const { cart } = useSelector((state) => state.cartItems);
	console.log(cart);
	const [purchases, setPurchases] = useState(cart);

	useEffect(() => {
		localStorage.setItem("purchase", JSON.stringify(purchases));
	}, [purchases]);
	return (
		<div className="container mx-auto py-8 sm:px-3 px-5">
			<h2 className="text-2xl font-semibold mb-4">Purchase Report</h2>
			{purchases.length === 0 ? (
				<p>No purchase history available.</p>
			) : (
				<div>
					<h3 className="text-lg font-semibold mb-2">Purchase History</h3>
					<ul className="mb-4">
						{purchases.map((purchase, idx) => (
							<li
								key={idx}
								className="flex  flex-wrap gap-5 items-center mb-4 "
							>
								<img
									src={purchase.image}
									alt=""
									className="w-16 h-16 sm:w-20 sm:h-20 rounded"
								/>

								<div className="flex flex-col   sm:flex-row sm:items-center sm:justify-between flex-grow">
									<p>Order ID: {purchase.id}</p>
									<p>Price: {purchase.price}</p>
									<p>Quantity: {purchase.quantity}</p>

									<h3 className="text-lg font-semibold mb-2 text-indigo-500">
										Total Price: {purchase.price * purchase.quantity} $
									</h3>
								</div>
								<hr className="my-4 w-full sm:hidden" />
							</li>
						))}
					</ul>
					<h3 className="text-lg font-semibold mb-2">Total Purchase</h3>
					<p className="text-xl">
						{purchases
							.reduce((data, obj) => data + obj.price * obj.quantity, 0)
							.toFixed(2)}{" "}
						$
					</p>
				</div>
			)}
		</div>
	);
};

export default PurchaseReport;
