const Loader = () => {
	let circleCommonClasses =
		"h-2.5 w-2.5 bg-current text-indigo-700 rounded-full";

	return (
		<div className="flex justify-center items-center">
			<div className={`${circleCommonClasses} mr-1`}></div>
			<div className={`${circleCommonClasses} mr-1`}></div>
			<div className={`${circleCommonClasses}`}></div>
		</div>
	);
};

export default Loader;
