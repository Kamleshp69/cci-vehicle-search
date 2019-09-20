import React from 'react';

import './VehicleSearch.css';
const apiRootUrl = 'https://swapi.co/api/';

class VehicleSearch extends React.Component {
    constructor(props) {
      super(props);
        
      this.handleSearchChange = this.handleSearchChange.bind(this);
      this.handlePrevClick = this.handlePrevClick(this);
      this.handleNextClick = this.handleNextClick(this);

      this.state = {
        userSearch: '',
        vehicleData : {
            count: 0,
            next: null,
            previous: null,
            results: [
                {
                    "name": "X-34 landspeeder",
                    "model": "X-34 landspeeder",
                    "manufacturer": "SoroSuub Corporation",
                    "cost_in_credits": "10550",
                    "length": "3.4",
                    "max_atmosphering_speed": "250",
                    "crew": "1",
                    "passengers": "1",
                    "cargo_capacity": "5",
                    "consumables": "unknown",
                    "vehicle_class": "repulsorcraft",
                    "pilots": [],
                    "films": [
                        "https://swapi.co/api/films/1/"
                    ],
                    "created": "2014-12-10T16:13:52.586000Z",
                    "edited": "2014-12-22T18:21:15.583700Z",
                    "url": "https://swapi.co/api/vehicles/7/"
                }
            ]
        }
      }
    }

    componentDidMount() {
        this.refreshData();
    }

    refreshData(searchString) {
        
        fetch(apiRootUrl + 'vehicles/?search=' + searchString)
        .then(res => res.json())
        .then((data) => {
          this.setState(
              {vehicleData: data}
          )
        })
        .catch(console.log);
    }

    renderTableRows() {
        return this.state.vehicleData.results.map(vehicle => {
            return <tr  key={vehicle.name}>
                <td>{vehicle.name}</td>
                <td>{vehicle.cost_in_credits}</td>
                <td>{vehicle.length}</td>
            </tr>;
        })
    }

    handleSearchChange(event) {
        //this.setState({userSearch: e.target.value})
        let searchValue = event.target.value;

        //Only search after atleast 2 character typed
        if (searchValue.length <2)
            return;

        this.refreshData(searchValue);
        
    }
    pageNavigation(pageUrl) {
        if (pageUrl === null)
            return;

        fetch(pageUrl)
        .then(res => res.json())
        .then((data) => {
          this.setState(
              {vehicleData: data}
          )
        })
        .catch(console.log);
    }
    handlePrevClick(event) {
        //const url = this.state.vehicleData.previous;
        //this.pageNavigation(url);
    }

    handleNextClick(event) {
        //const url = this.state.vehicleData.next;
        //this.pageNavigation(url);
    }
    render() {
        return (
            <div>
                <div className="App-search">
                <input placeholder="Search vehicles" onChange={this.handleSearchChange} />
                </div>
                <div className="card">
                    <div className="card-body">
                        <table className="Vehicles-list">
                            <tr>
                                <th>Name</th>
                                <th>Cost in credits</th>
                                <th>Length</th>
                            </tr>
                            {this.renderTableRows()}
                        </table>
                    </div>
                    <div className="card-footer">
                        <div className="nav">
                            <span>Total Rows {this.state.vehicleData.count}
                            <a onClick={this.handlePrevClick}>Previous</a>
                            <a onClick={this.handleNextClick}>Next</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default VehicleSearch;