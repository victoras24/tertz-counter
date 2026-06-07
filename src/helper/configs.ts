import {
	IconPlayCard10,
	IconPlayCardA,
	IconPlayCardJ,
	IconPlayCardK,
	IconPlayCardQ,
} from "@tabler/icons-react";

export const declarations = [
	{
		name: "Tertz",
		points: 20,
		useLimit: 4,
		icons: [IconPlayCardA, IconPlayCardK, IconPlayCardQ],
	},
	{
		name: "Palto",
		points: 50,
		useLimit: 4,
		icons: [
			IconPlayCardA,
			IconPlayCardK,
			IconPlayCardQ,
			IconPlayCardJ,
			IconPlayCard10,
		],
	},
	{
		name: "Bella",
		points: 20,
		useLimit: 1,
		icons: [IconPlayCardK, IconPlayCardQ],
	},
];
