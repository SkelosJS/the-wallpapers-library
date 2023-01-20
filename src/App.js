// React-router-dom
import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import Upload from "./views/Upload";

const App = () => {
  
  return (
    <Router>
      <Switch>
        <Route exact path="/upload" element={<Upload />} />
      </Switch>
    </Router>
  )
}

export default App;