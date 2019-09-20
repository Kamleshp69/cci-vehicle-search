import React from 'react';
import './App.css';

import VehicleSearch from '../VehicleSearch/VehicleSearch';



class App extends React.Component {
  
  render() {
    return (
      <div className="App">
        <h2>Vehicles</h2>
        <VehicleSearch />
      </div>
    );
}
}

export default App;
