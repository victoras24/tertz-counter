import "./suit-picker.css";
const SUITS = [
	{ id: "hearts", symbol: "♥", label: "hearts", red: true },
	{ id: "diamonds", symbol: "♦", label: "diamonds", red: true },
	{ id: "spades", symbol: "♠", label: "spades", red: false },
	{ id: "clubs", symbol: "♣", label: "clubs", red: false },
];

interface SuitPickerProps {
	selected: string;
	onChange: (id: string) => void;
}

export const SuitPicker: React.FC<SuitPickerProps> = ({
	selected,
	onChange,
}) => {
	return (
		<div className="suit-picker">
			{SUITS.map((suit) => (
				<button
					key={suit.id}
					type="button"
					className={`suit-picker__card ${
						selected === suit.id ? "suit-picker__card--active" : ""
					}`}
					onClick={() => onChange(suit.id)}
				>
					<span
						className={`suit-picker__symbol ${
							suit.red
								? "suit-picker__symbol--red"
								: "suit-picker__symbol--black"
						}`}
					>
						{suit.symbol}
					</span>
					<span className="suit-picker__label">{suit.label}</span>
				</button>
			))}
		</div>
	);
};
