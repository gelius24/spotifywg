import './App.css';
import Dashboard from './Dashboard';
import Login from './Login'

const code = new URLSearchParams(window.location.search).get('code')

function App() {
  return (
    code ? <div className="dashboard"><Dashboard code={code} /></div>
    :
    <div className="app">
      <Login />
    </div>
  );
}

export default App;
