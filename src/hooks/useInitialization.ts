import React from "react";
import { getConfigFromLocalStorageIfEmptyReturnDefaultConfig } from "../helper/common";

export const useInitialize = (
	localStorageKey: string,
	defaultConfig: unknown
) => {
	const [config, setConfig] = React.useState(
		getConfigFromLocalStorageIfEmptyReturnDefaultConfig(
			localStorageKey,
			defaultConfig
		)
	);

	React.useEffect(() => {
		if (config !== defaultConfig)
			localStorage.setItem(localStorageKey, JSON.stringify(config));
	}, [defaultConfig, config, localStorageKey]);

	return { config, setConfig };
};
