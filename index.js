import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import URLParamsTool from './components/URLParamsTool';

function App() {
  return (
    <div>
      <h1>日常工作|常用工具</h1>
      <hr />
      <URLParamsTool />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('react-root'));
