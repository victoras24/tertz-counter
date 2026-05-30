import el from "../dictionary/el.json";
import en from "../dictionary/en.json";
import ru from "../dictionary/ru.json";
import type { LocaleUnionTypes } from "../types";

const locales = { el, en, ru };

export const getTranslation = (language: LocaleUnionTypes) => {
	return locales[language] ?? locales.en;
};
