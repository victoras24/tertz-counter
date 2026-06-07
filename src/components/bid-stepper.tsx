import "./bid-stepper.css";

interface BidStepperProps {
	value: number;
	min?: number;
	max?: number;
	step?: number;
	onChange: (value: number) => void;
}

export const BidStepper: React.FC<BidStepperProps> = ({
	value,
	min = 62,
	max = 162,
	step = 2,
	onChange,
}) => {
	return (
		<div className="bid-stepper">
			<button
				type="button"
				className="bid-stepper__btn"
				onClick={() => onChange(Math.max(min, value - step))}
				disabled={value <= min}
				aria-label="Decrease bid"
			>
				−
			</button>
			<span className="bid-stepper__value">{value}</span>
			<button
				type="button"
				className="bid-stepper__btn"
				onClick={() => onChange(Math.min(max, value + step))}
				disabled={value >= max}
				aria-label="Increase bid"
			>
				+
			</button>
		</div>
	);
};
