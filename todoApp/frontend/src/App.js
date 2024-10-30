import React from 'react';
import Registration from './components/Registration';
import Login from './components/Login';
import Task from './components/Task';
import Notification from './components/Notification';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the React App</h1>
      </header>
      <main>
        <Registration />
        <Login />
        <Task />
        <Notification />
      </main>
      <footer>
        <p>© 2023 React App</p>
      </footer>
    </div>
  );
}

export default App;
