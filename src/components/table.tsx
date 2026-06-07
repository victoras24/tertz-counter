import { getShortName } from "../helper/common";
import "./table.css";

export const Table: React.FC<{
	you: string;
	partner: string;
	front: string;
	right: string;
}> = ({ you, partner, front, right }) => {
	return (
		<div className="table-container">
			<div className="table">
				<span className="suits">♠ ♥ ♦ ♣</span>
			</div>
			<Seat text={"you"} position={"you"} input={you} />
			<Seat text={"ally"} position={"left-top"} input={partner} />
			<Seat text={"enemy"} position={"left-bottom"} input={front} />
			<Seat text={"enemy"} position={"right-top"} input={right} />
		</div>
	);
};

const Seat: React.FC<{ text: string; position: string; input: string }> = ({
	text,
	position,
	input,
}) => {
	return (
		<div className={`seat seat-${position}`}>
			<div className={`seat-avatar avatar-${text}`}>
				{input ? getShortName(input) : "?"}
			</div>
		</div>
	);
};
