import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import URLParamsTool from './components/URLParamsTool';

function App() {
  return (
    <div style={{ margin: 100 }}>
      <h1>URL参数拼接工具</h1>
      <hr /><br />
      <URLParamsTool />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
