import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import BreedDetail from "./pages/BreedDetail";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import NewBreed from "./pages/NewBreed";

import s from "./App.module.css";

export default function App() {
    return (
        <>
            <Route exact path="/" component={Landing} />
            <Route path={"/breeds"} render={() =>
                <div className={s.container}>
                    <NavBar />
                    <Switch>
                        <Route exact path="/breeds" component={Home} />
                        <Route exact path="/breeds/new" component={NewBreed} />
                        <Route exact path="/breeds/:id" component={BreedDetail} />
                    </Switch>
                </div>
            } />
        </>
    );
}