import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const PurchaseReport = () => {
	const { cart } = useSelector((state) => state.cartItems);
	const [purchases, setPurchases] = useState(cart);

	// Calculate total amount spent on each category
	const calculateCategoryTotal = () => {
		const categoryTotals = {};

		purchases.forEach((purchase) => {
			purchase.products.forEach((product) => {
				if (categoryTotals.hasOwnProperty(product.category)) {
					categoryTotals[product.category] += product.price;
				} else {
					categoryTotals[product.category] = product.price;
				}
			});
		});

		return categoryTotals;
	};

	const categoryTotals = calculateCategoryTotal();

	return (
		<div className="container mx-auto py-8">
			<h2 className="text-2xl font-semibold mb-4">Purchase Report</h2>
			{purchases.length === 0 ? (
				<p>No purchase history available.</p>
			) : (
				<div>
					<h3 className="text-lg font-semibold mb-2">Purchase History</h3>
					<ul className="mb-4">
						{purchases.map((purchase) => (
							<li key={purchase.id}>
								<p>Order ID: {purchase.id}</p>
								<p>Date: {purchase.date}</p>
								<ul>
									{purchase.products.map((product) => (
										<li key={product.id}>
											{product.title} - ${product.price}
										</li>
									))}
								</ul>
								<hr className="my-4" />
							</li>
						))}
					</ul>
					<h3 className="text-lg font-semibold mb-2">Category Totals</h3>
					<ul>
						{Object.entries(categoryTotals).map(([category, total]) => (
							<li key={category}>
								{category} - ${total.toFixed(2)}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default PurchaseReport;
