import './App.css';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Join from '../src/component/Join/Join'
import Chat from '../src/component/Chat/Chat'
// const ENDPOINT = 'http://localhost:4500/';
// const socket=socketIo(ENDPOINT , {transports:['websocket']});


function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" Component={Join}/>
        
        <Route path = "/chat" Component={Chat}/>
      </Routes>
      </Router>
     
    </div>
  );
}

export default App;
