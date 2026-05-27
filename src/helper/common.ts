export const getShortName = (fullName: FormDataEntryValue) => {
	return String(fullName)[0].toUpperCase();
};
