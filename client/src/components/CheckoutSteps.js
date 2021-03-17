import React from "react";
import { Link } from "react-router-dom";

function CheckoutSteps({ step1, step2, step3, step4 }) {
	return (
		<div>
			<nav>
				<ul className="nav d-flex justify-content-center">
					<li className="nav-item">
						{step1 ? (
							<Link className="nav-link" to="/log-in">
								Log in
							</Link>
						) : (
							<Link
								className="nav-link disabled"
								to="/log-in"
								onClick={e => e.preventDefault()}
							>
								Log in
							</Link>
						)}
					</li>
					<li className="nav-item">
						{step2 ? (
							<Link className="nav-link" to="/shipping">
								Shipping
							</Link>
						) : (
							<Link
								className="nav-link disabled"
								to="/shipping"
								onClick={e => e.preventDefault()}
							>
								Shipping
							</Link>
						)}
					</li>
					<li className="nav-item">
						{step3 ? (
							<Link className="nav-link" to="/payment">
								Payment
							</Link>
						) : (
							<Link
								className="nav-link disabled"
								to="/payment"
								onClick={e => e.preventDefault()}
							>
								Payment
							</Link>
						)}
					</li>
					<li className="nav-item">
						{step4 ? (
							<Link className="nav-link" to="/place-order">
								Place order
							</Link>
						) : (
							<Link
								className="nav-link disabled"
								to="/place-order"
								onClick={e => e.preventDefault()}
							>
								Place order
							</Link>
						)}
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default CheckoutSteps;
