import React from "react";
import { getConfigFromLocalStorageIfEmptyReturnDefaultConfig } from "../helper/common";

export const useInitialize = <T>(localStorageKey: string, defaultValue: T) => {
	const [state, setState] = React.useState<T>(
		getConfigFromLocalStorageIfEmptyReturnDefaultConfig(
			localStorageKey,
			defaultValue
		) as T
	);

	React.useEffect(() => {
		if (state !== defaultValue) {
			localStorage.setItem(localStorageKey, JSON.stringify(state));
		}
	}, [state, localStorageKey, defaultValue]);

	return { state, setState };
};
