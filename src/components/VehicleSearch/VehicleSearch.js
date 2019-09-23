import React from 'react';

import './VehicleSearch.css';
import TextSearch from '../TextSearch/TextSearch';
const apiRootUrl = 'https://swapi.co/api/';

class VehicleSearch extends React.Component {
    
    constructor(props) {
      super(props); 
      this.handleSearchChange = this.handleSearchChange.bind(this);
      this.handlePrevClick = this.handlePrevClick.bind(this);
      this.handleNextClick = this.handleNextClick.bind(this);

      this.state = {
        currentPage : 0,
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
        searchString = searchString || '';
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
        
        let searchValue = event;
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
        const url = this.state.vehicleData.previous;
        if (url){
            this.pageNavigation(url);
            this.setState ({currentPage: this.state.currentPage - 1});
        }
    }

    handleNextClick(event) {
        const url = this.state.vehicleData.next;
        if (url){
            this.pageNavigation(url);
            this.setState ({currentPage: this.state.currentPage + 1});
        }
    }
    renderPageNavComments(){
        const currentPage = this.state.currentPage;
        const pageCount = this.state.vehicleData.count;
        // Since the Service returns 10 records max at time, we can use 10
        //We can also set this value in Config

        let cFrom = currentPage * 10 + 1;
        let cTo = currentPage * 10 + 10;
        if (cTo > pageCount)
            cTo = pageCount;

        return <span>{`${cFrom} - ${cTo} of ${pageCount}`}</span>;
    }
    render() {
        return (
            <div>
                <div className="App-search">
                    <TextSearch placeholder="Search vehicles" onChange={this.handleSearchChange}/>
                </div>
                <div className="card">
                    <div className="card-body">
                        <table className="Vehicles-list">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Cost in credits</th>
                                <th>Length</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderTableRows()}
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer">
                        <div className="nav">
                            {this.renderPageNavComments()}
                            <a onClick={this.handlePrevClick}>Previous</a>
                            <a onClick={this.handleNextClick}>Next</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default VehicleSearch;