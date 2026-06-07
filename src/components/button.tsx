import "./button.css";

interface ButtonProps {
	label: string;
	type?: "button" | "submit" | "reset";
	onClick?: () => void;
	disabled?: boolean;
	variant?: "primary" | "ghost";
}

export const Button: React.FC<ButtonProps> = ({
	label,
	type = "button",
	onClick,
	disabled = false,
	variant = "primary",
}) => {
	return (
		<button
			className={`btn btn--${variant}`}
			type={type}
			onClick={onClick}
			disabled={disabled}
		>
			{label}
		</button>
	);
};
