import React from "react";
import { Link } from "react-router-dom";

function Pagination({ pages, currentPage, searchTerm = "", adminPage = false }) {
	const getPageLinks = pages => {
		const links = [];
		if (pages < 1) {
			return links;
		}
		for (let i = 1; i <= pages; i++) {
			links.push(i);
		}
		return links;
	};

	return (
		pages > 1 && (
			<nav>
				<ul className="pagination">
					{currentPage - 1 !== 0 ? (
						<li className="page-item">
							<Link
								className="page-link"
								to={
									adminPage
										? `/admin/products-list/${currentPage - 1}`
										: searchTerm
										? `/search/${searchTerm}/page/${currentPage - 1}`
										: `/page/${currentPage - 1}`
								}
							>
								Previous
							</Link>
						</li>
					) : (
						<li className="page-item disabled">
							<span className="page-link">Previous</span>
						</li>
					)}
					{getPageLinks(pages).map(pageLink => (
						<li
							key={pageLink}
							className={pageLink === currentPage ? "page-item active" : "page-item"}
						>
							<Link
								className="page-link"
								to={
									adminPage
										? `/admin/products-list/${pageLink}`
										: searchTerm
										? `/search/${searchTerm}/page/${pageLink}`
										: `/page/${pageLink}`
								}
							>
								{pageLink}
							</Link>
						</li>
					))}
					{currentPage + 1 <= pages ? (
						<li className="page-item">
							<Link
								className="page-link"
								to={
									adminPage
										? `/admin/products-list/${currentPage + 1}`
										: searchTerm
										? `/search/${searchTerm}/page/${currentPage + 1}`
										: `/page/${currentPage + 1}`
								}
							>
								Next
							</Link>
						</li>
					) : (
						<li className="page-item disabled">
							<span className="page-link">Next</span>
						</li>
					)}
				</ul>
			</nav>
		)
	);
}

export default Pagination;
