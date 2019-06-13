import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table'
import "react-table/react-table.css";
import './App.css';

const columns = [{
  Header: 'Name',
  accessor: 'name' // String-based value accessors!
  }, {
    Header: 'Address',
    accessor: 'address',
  }, {
    Header: 'Price',
    accessor: 'price',
}]

const getRestaurants = (url, restaurants, resolve, reject) => {
  axios.get(url)
    .then(response => {
      const retrievedRestaurants = restaurants.concat(response.data.restaurants);
      console.log(response.data.current_page);
      if (response.data.current_page * response.data.per_page < response.data.total_entries) {
        getRestaurants(url + "&page=" + (response.data.current_page + 1).toString(), retrievedRestaurants, resolve, reject);
      } else {
        resolve(retrievedRestaurants);
      }
    })
    .catch(error => {
      console.log(error);
      reject('Something wrong. Please refresh the page and try again.');
    })
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      query: "",
      res: [],
      showWarning: false,
      updateMsg: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInputChange(event) {
    this.setState({
       query: this.search.value,
       showWarning: false
    });
  }

  handleSearch(event) {
    event.preventDefault();
    const url = "http://opentable.herokuapp.com/api/restaurants?city=" + this.search.value;

    this.setState({updateMsg: "Please wait momentarily"});
    new Promise((resolve, reject) => {
      getRestaurants(url, [], resolve, reject)
    })
    .then(response => {
      this.setState({
         res: response,
         updateMsg: ""
      });

      if (response.length === 0) {
        this.setState({showWarning: true});
      }
      console.log("success");
      console.log(this.state.res);
    });
  }

    render () {

        return (
            <div className="container">
                <h1>RestoFinder</h1>
                <form>
                  <div className="searchBarContainer">
                    <input
                      className="inputField"
                      placeholder="Enter city name"
                      ref={input => this.search = input}
                      onChange={this.handleInputChange}
                    />
                    <button type="submit" className="searchBtn" onClick={this.handleSearch}>Search</button>
                  </div>
               </form>
               <div className="results">
                 <p>{this.state.updateMsg}</p>
                 {this.state.showWarning ?
                   <p>Invalid Input!</p> :
                     <ReactTable className="table"
                       data={this.state.res}
                       columns={columns}
                       defaultPageSize={10}
                     />
                 }
               </div>
            </div>
        );
    }
}
export default App;
