import React, { useState } from 'react';
import { Provider } from 'react-redux';
import './theme.scss';

const App: React.FC = () => {
  const [counter, setCounter] = useState(0);

  return (
      <div className="App">
        <header className="App-header">
          <p>
            Now at number {counter}
          </p>
          <button onClick={() => setCounter(counter + 1)}>Click me</button>
        </header>
      </div>
  );
}

export default App;
