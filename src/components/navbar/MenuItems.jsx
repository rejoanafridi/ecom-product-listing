import React from "react";

const MenuItems = (props) => {
	const { title } = props;
	return (
		<a className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md transition duration-300">
			{title}
		</a>
	);
};

export default MenuItems;
