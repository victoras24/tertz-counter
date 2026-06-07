import { useState } from "react";
import "./toggle-pill.css";

interface TogglePillProps {
	text: string;
	name: string;
	defaultChecked?: boolean;
}

export const TogglePill: React.FC<TogglePillProps> = ({
	text,
	name,
	defaultChecked = false,
}) => {
	const [on, setOn] = useState(defaultChecked);

	return (
		<label className={`toggle-pill ${on ? "toggle-pill--on" : ""}`}>
			<input
				type="checkbox"
				name={name}
				checked={on}
				onChange={() => setOn(!on)}
				style={{ display: "none" }}
			/>
			{text}
			<div className={`toggle-track ${on ? "toggle-track--on" : ""}`}>
				<div className="toggle-thumb" />
			</div>
		</label>
	);
};
