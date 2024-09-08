// src/App.js
import React from 'react';

function App() {
  const dbServer = process.env.REACT_APP_TEXALA_GATEWAY_URL || 'default-db-server';
  const dbPort = process.env.REACT_APP_TEXALA_WEBSOCKET_SALES_URL || 'default-db-port';

  return (
    <div className="App">
      <h1>React App</h1>
      <p>DB Server: {dbServer}</p>
      <p>DB Port: {dbPort}</p>
    </div>
  );
}

export default App;
