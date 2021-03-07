import React from "react";
import { IconContext } from "react-icons";
import { FaStar, FaStarHalf } from "react-icons/fa";

function Rating({ value, text }) {
	return (
		<IconContext.Provider value={{ className: "star" }}>
			<div className="mb-2">
				<span>{value >= 1 ? <FaStar /> : value >= 0.5 ? <FaStarHalf /> : ""}</span>
				<span>{value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalf /> : ""}</span>
				<span>{value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalf /> : ""}</span>
				<span>{value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalf /> : ""}</span>
				<span>{value >= 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalf /> : ""}</span>
				<small className="text-muted">{text && ` ${text}`}</small>
			</div>
		</IconContext.Provider>
	);
}

export default Rating;
