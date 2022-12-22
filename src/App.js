import './App.css';
import GlobalModal from './components/modal';
import BasicExample from './components/nav'
import Router from './router';
function App() {
  return (
    <div className="App">
      <BasicExample/>
      <Router/>
      <GlobalModal/>
    </div>
  );
}

export default App;
