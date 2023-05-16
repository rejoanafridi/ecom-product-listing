import axios from "../../utils/axios";

export const getCartItems = async () => {
	const response = await axios.get("/cart");

	return response.data;
};
export const addCartItem = async (data) => {
	const response = await axios.post("/carts", data);

	return response.data;
};
