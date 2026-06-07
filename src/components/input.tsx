import "./input.css";
interface InputProps {
	id: string;
	type: string;
	color: "blue" | "red";
	placeholder: string;
	maxLength?: number;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
	id,
	type,
	color,
	placeholder,
	maxLength,
	value,
	onChange,
}) => {
	return (
		<input
			id={id}
			name={id}
			type={type}
			className={`input input--${color}`}
			placeholder={placeholder}
			maxLength={maxLength}
			value={value}
			onChange={onChange}
		/>
	);
};
