import { Route } from "react-router-dom";
import Landing from './components/pages/Landing'
import Home from './components/pages/Home'
import NewBreed from './components/pages/NewBreed'
import BreedDetail from './components/pages/BreedDetail'

function App() {
  return (
    <>
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/new-breed" component={NewBreed} />
      <Route exact path="/:id" component={BreedDetail} />
    </>
  );
}

export default App;
