import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export function AuthenticationRoute({ component: Component, ...rest }) {
	const { currentUser } = useSelector(state => state.user);

	return (
		<Route
			{...rest}
			render={props =>
				currentUser ? (
					<Redirect
						to={props.location.state ? props.location.state.from.pathname : "/"}
					/>
				) : (
					<Component {...props} />
				)
			}
		/>
	);
}

export function PrivateRoute({ component: Component, ...rest }) {
	const { currentUser } = useSelector(state => state.user);

	return (
		<Route
			{...rest}
			render={props =>
				currentUser ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: "/log-in", state: { from: props.location } }} />
				)
			}
		/>
	);
}
