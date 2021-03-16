import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaShoppingCart, FaUser } from "react-icons/fa";

function Header() {
	const { currentUser } = useSelector(state => state.user);

	const cartCount = localStorage.getItem("cart")
		? JSON.parse(localStorage.getItem("cart")).length
		: null;

	return (
		<header
			className="navbar navbar-expand-lg navbar-light shadow-sm mb-4"
			style={{ backgroundColor: "#fff" }}
		>
			<IconContext.Provider value={{ className: "header-icons" }}>
				<div className="container">
					<Link className="navbar-brand text-primary font-weight-bold" to="/">
						E-SHOP
					</Link>
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
									<FaShoppingCart /> Cart {cartCount && `(${cartCount})`}
								</Link>
							</li>
							{!currentUser ? (
								<li className="nav-item">
									<Link className="nav-link" to="/log-in">
										<FaUser /> Log in
									</Link>
								</li>
							) : (
								<li className="nav-item dropdown">
									<Link
										className="nav-link dropdown-toggle"
										to="#"
										id="navbarDropdown"
										role="button"
										data-toggle="dropdown"
										aria-haspopup="true"
										aria-expanded="false"
									>
										{currentUser.name}
									</Link>
									<div className="dropdown-menu" aria-labelledby="navbarDropdown">
										<Link className="dropdown-item" to="/user">
											Your profile
										</Link>
										<div className="dropdown-divider"></div>
										<Link className="dropdown-item" to="/log-out">
											Log out
										</Link>
									</div>
								</li>
							)}
						</ul>
					</div>
				</div>
			</IconContext.Provider>
		</header>
	);
}

export default Header;
