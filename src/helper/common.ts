export const getShortName = (fullName: unknown) => {
	if (typeof fullName === "string") {
		return fullName
			.split(" ")
			.map((word) => word[0])
			.join("")
			.toUpperCase();
	}
};
