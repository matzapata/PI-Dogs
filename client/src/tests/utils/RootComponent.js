import { Provider } from "react-redux";
import App from "../../App";
import store from "../../redux/store";
import { Router } from "react-router";

export const RootComponent = ({ history }) => {
    return (
        <Router history={history}>
            <Provider store={store}>
                <App />
            </Provider>
        </Router>
    );
};