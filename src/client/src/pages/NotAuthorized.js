import Alert from "../components/Alert";
import { Link } from "react-router-dom";
function NotAuthorized() {
	return (
		<main className="main-container" role="main">
			<section className="w-75 mx-auto">
				<Alert type="danger" message="Sorry you have to be an admin to visit that page" />
				<Link to="/">Go back to HomePage</Link>
			</section>
		</main>
	);
}

export default NotAuthorized;
