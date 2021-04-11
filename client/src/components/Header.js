import React from "react";
import { useSelector } from "react-redux";
import { Route, Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import SeachBox from "./SeachBox";

function Header() {
	const { currentUser } = useSelector(state => state.users);
	const { cartItems } = useSelector(state => state.cart);

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
					<Route render={({ history }) => <SeachBox history={history} />} />
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
					<nav className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav ml-auto">
							{currentUser && currentUser.isAdmin && (
								<li className="nav-item dropdown">
									<button
										className="btn btn-link nav-link dropdown-toggle"
										id="navbarDropdown"
										data-toggle="dropdown"
										aria-haspopup="true"
										aria-expanded="false"
									>
										Admin options
									</button>
									<div className="dropdown-menu" aria-labelledby="navbarDropdown">
										<Link className="dropdown-item" to="/admin/users-list">
											Users
										</Link>
										<Link className="dropdown-item" to="/admin/products-list">
											Products
										</Link>
										<Link className="dropdown-item" to="/admin/orders-list">
											Orders
										</Link>
									</div>
								</li>
							)}
							<li className="nav-item">
								<Link className="nav-link" to="/cart">
									<FaShoppingCart /> Cart{" "}
									{cartItems && cartItems.length > 0 && `(${cartItems.length})`}
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
									<button
										className="btn btn-link nav-link dropdown-toggle"
										id="navbarDropdown"
										data-toggle="dropdown"
										aria-haspopup="true"
										aria-expanded="false"
									>
										{currentUser.name}
									</button>
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
					</nav>
				</div>
			</IconContext.Provider>
		</header>
	);
}

export default Header;
