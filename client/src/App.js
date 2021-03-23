import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "../src/components/Header";
import HomePage from "./pages/HomePage";
import SingleProduct from "./pages/SingleProduct";
import CartPage from "./pages/CartPage";
import SignupPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import LogOutPage from "./pages/LogOutPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import PageNotFound from "./pages/PageNotFound";

function App() {
	return (
		<div>
			<Header />
			<Switch>
				<Route path="/product/:id" component={SingleProduct} />
				<Route path="/shipping" component={ShippingPage} />
				<Route path="/placeorder" component={PlaceOrderPage} />
				<Route path="/payment" component={PaymentPage} />
				<Route path="/order/:id" component={OrderPage} />
				<Route path="/sign-up" component={SignupPage} />
				<Route path="/log-out" component={LogOutPage} />
				<Route path="/log-in" component={LogInPage} />
				<Route path="/not-found" component={PageNotFound} />
				<Route path="/user" component={ProfilePage} />
				<Route path="/cart" component={CartPage} />
				<Route exact path="/" component={HomePage} />
				<Redirect to="/not-found" />
			</Switch>
		</div>
	);
}

export default App;
