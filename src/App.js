// React-router-dom
import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";

import { addDoc, collection } from "firebase/firestore";
import db from "./firebaseSetup";

const App = () => {
  function handleSubmit() {
      const ref = collection(db, 'cities');

      let data = {
        city: 'Hamburg'
      }

      try {
        addDoc(ref, data);
      } catch(err) {
        console.log(err);
      }
  }
  
  return (
    <Router>
      <div>
        <button onClick={handleSubmit}>test</button>
      </div>
      <Switch>
        <Route exact path="/" element={<div>Page</div>} />
      </Switch>
    </Router>
  )
}

export default App;