import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthenticationRoute, PrivateRoute } from "./utils/AuthRoutes";
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
import UsersListPage from "./pages/UsersListPage";
import EditUserStatusPage from "./pages/EditUserStatusPage";
import ProductListPage from "./pages/ProductListPage";
import CreateProductPage from "./pages/CreateProductPage";
import PageNotFound from "./pages/PageNotFound";
import NotAuthorized from "./pages/NotAuthorized";

function App() {
	return (
		<div>
			<Header />
			<Switch>
				<PrivateRoute path="/admin/user/:id/edit-status" component={EditUserStatusPage} />
				<PrivateRoute path="/admin/create-product" component={CreateProductPage} />
				<PrivateRoute path="/admin/products-list" component={ProductListPage} />
				<PrivateRoute path="/admin/users-list" component={UsersListPage} />
				<Route path="/product/:id" component={SingleProduct} />
				<PrivateRoute path="/shipping" component={ShippingPage} />
				<PrivateRoute path="/placeorder" component={PlaceOrderPage} />
				<PrivateRoute path="/payment" component={PaymentPage} />
				<PrivateRoute path="/order/:id" component={OrderPage} />
				<AuthenticationRoute path="/sign-up" component={SignupPage} />
				<Route path="/log-out" component={LogOutPage} />
				<AuthenticationRoute path="/log-in" component={LogInPage} />
				<Route path="/not-authorized" component={NotAuthorized} />
				<Route path="/not-found" component={PageNotFound} />
				<PrivateRoute path="/user" component={ProfilePage} />
				<Route path="/cart" component={CartPage} />
				<Route exact path="/" component={HomePage} />
				<Redirect to="/not-found" />
			</Switch>
		</div>
	);
}

export default App;
