import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../state_management/usersState";

function LogOutPage() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(logOut());
	}, [dispatch]);

	return null;
}

export default LogOutPage;
