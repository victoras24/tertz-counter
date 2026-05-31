import React from "react";
import { getConfigFromLocalStorageIfEmptyReturnDefaultConfig } from "../helper/common";

export const useInitialize = (
	localStorageKey: string,
	defaultConfig: unknown
) => {
	const [state, setState] = React.useState(
		getConfigFromLocalStorageIfEmptyReturnDefaultConfig(
			localStorageKey,
			defaultConfig
		)
	);

	React.useEffect(() => {
		if (state !== defaultConfig)
			localStorage.setItem(localStorageKey, JSON.stringify(state));
	}, [defaultConfig, state, localStorageKey]);

	return { state, setState };
};
