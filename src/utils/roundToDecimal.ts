const roundToDecimal = (value: number, decimals: number): string => {
	return Number(
		Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals
	).toFixed(decimals);
};

export default roundToDecimal;
