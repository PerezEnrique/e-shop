import React from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaShoppingCart, FaUser } from "react-icons/fa";

function Header() {
	return (
		<header
			className="navbar navbar-expand-lg navbar-light shadow-sm mb-4"
			style={{ backgroundColor: "#fff" }}
		>
			<IconContext.Provider value={{ className: "header-icons" }}>
				<div className="container">
					<a className="navbar-brand text-primary font-weight-bold" href="/">
						E-SHOP
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item">
								<Link className="nav-link" to="/cart">
									<FaShoppingCart /> Cart (1)
								</Link>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/">
									<FaUser /> Log in
								</a>
							</li>
						</ul>
					</div>
				</div>
			</IconContext.Provider>
		</header>
	);
}

export default Header;
