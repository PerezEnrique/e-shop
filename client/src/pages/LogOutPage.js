import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../state_management/userState";

function LogOutPage() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(logOut());
	}, [dispatch]);

	return null;
}

export default LogOutPage;
