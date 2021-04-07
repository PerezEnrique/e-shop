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
import UpdateProductPage from "./pages/UpdateProductPage";
import OrderListPage from "./pages/OrdersListPage";
import PageNotFound from "./pages/PageNotFound";
import NotAuthorized from "./pages/NotAuthorized";

function App() {
	return (
		<div>
			<Header />
			<Switch>
				<PrivateRoute
					path="/admin/users/:id/edit-status"
					component={EditUserStatusPage}
				/>
				<PrivateRoute path="/admin/create-product" component={CreateProductPage} />
				<PrivateRoute path="/admin/products-list" component={ProductListPage} />
				<PrivateRoute path="/admin/orders-list" component={OrderListPage} />
				<PrivateRoute path="/admin/users-list" component={UsersListPage} />
				<PrivateRoute path="/admin/products/:id/update" component={UpdateProductPage} />
				<Route path="/products/:id" component={SingleProduct} />
				<PrivateRoute path="/orders/:id" component={OrderPage} />
				<PrivateRoute path="/shipping" component={ShippingPage} />
				<PrivateRoute path="/placeorder" component={PlaceOrderPage} />
				<PrivateRoute path="/payment" component={PaymentPage} />
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
