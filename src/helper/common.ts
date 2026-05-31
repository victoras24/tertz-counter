export const getShortName = (fullName: FormDataEntryValue) => {
	return String(fullName)[0].toUpperCase();
};

export const getConfigFromLocalStorageIfEmptyReturnDefaultConfig = (
	storageKey: string,
	defaultConfig: unknown
) => {
	const saved = localStorage.getItem(storageKey);
	return saved ? JSON.parse(saved) : defaultConfig;
};
