import "./input.css";

interface InputProps {
	id: string;
	type: React.InputHTMLAttributes<HTMLInputElement>["type"];
	color: InputColor;
	placeholder: string;
	maxLength: number;
}

type InputColor = "red" | "blue";

export const Input: React.FC<InputProps> = ({
	id,
	color,
	placeholder,
	type,
	maxLength,
}) => {
	return (
		<input
			className={`input input--${color} flex-1`}
			type={type}
			placeholder={placeholder}
			id={id}
			maxLength={maxLength}
		/>
	);
};
