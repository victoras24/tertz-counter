import "./table.css";

export const Table: React.FC = () => {
	return (
		<div className="table-container">
			<div className="table">
				<span className="suits">♠ ♥ ♦ ♣</span>
			</div>
			<Seat text={"you"} position={"you"} />
			<Seat text={"ally"} position={"left-top"} />
			<Seat text={"enemy"} position={"left-bottom"} />
			<Seat text={"enemy"} position={"right"} />
		</div>
	);
};

const Seat: React.FC<{ text: string; position: string }> = ({
	text,
	position,
}) => {
	return (
		<div className={`seat seat-${position}`}>
			<div className={`seat-avatar avatar-${text}`}>?</div>
			<span className={`seat-name name-${text}`}>{text}</span>
		</div>
	);
};
