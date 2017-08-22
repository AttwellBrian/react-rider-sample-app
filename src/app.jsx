import React from 'react';
import '../styles/index.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import GoogleMapReact from 'google-map-react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {authToken: localStorage.getItem('authToken')}
    this.onLoggedIn = this.onLoggedIn.bind(this);
  }
  
  onLoggedIn(authTokenValue) {
    localStorage.setItem('authToken', authTokenValue);
    this.setState({authToken: authTokenValue});
  }
  
  render() {
    if (this.state.authToken === '') {  
      return <MuiThemeProvider>
        <Login onLoggedIn={this.onLoggedIn}/>
      </MuiThemeProvider>;
    } else {
      return <MuiThemeProvider>
      <LoggedIn 
        authToken={this.state.authToken}
        onLogout={() => this.onLoggedIn('')}
        />
      </MuiThemeProvider>;
    }
  }
}

const LocationDot = ({ text }) => (
  <div className="circleBase circleInside">
    Current Location
  </div>
);

class LoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        coordinates: {lat: 37.774930, lng: -122.419420},
        products: []};
  }
  
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        this.setPosition(position);
    });
    // Fake a network call to /products
    setTimeout(function() { 
        const products = [
            {
              id: 1,
              name: "TripX"
            },
            {
              id: 2,
              name: "Pool"
            }
        ];
        this.setState({products: products});
        console.log("MOO!");
    }.bind(this), 1300);
  }
  
  /**
   * Animate to new position over 500ms.
   */ 
  setPosition(position) {
    const startLat = this.state.coordinates.lat;
    const startLng = this.state.coordinates.lng;
    const goalLat = position.coords.latitude;
    const goalLng = position.coords.longitude;
    const startingTime = new Date().getTime();
    const intervalRef = window.setInterval( () => {
        const currentTime = new Date().getTime();
        const elapsed = (currentTime - startingTime) / 500.0;  
        const currentLat = (startLat) + (goalLat - startLat) * elapsed;
        const currentLng = (startLng) + (goalLng - startLng) * elapsed;
        console.log(elapsed);
        this.setState(
            {coordinates: 
                {lat: currentLat, 
                lng: currentLng}
            });        
        if (elapsed > 1) {
            window.clearInterval(intervalRef);
            this.setState(
                {coordinates: 
                    {lat: goalLat, 
                    lng: goalLng}
                });     
        }
    }, 16);
  }

  render() {
    return (
      <div className="fullscreen">
        <div className="fullscreen">
            <GoogleMapReact            
                center={{lat: this.state.coordinates.lat, lng: this.state.coordinates.lng}}
                defaultZoom={11}>
                <LocationDot 
                  lat={this.state.coordinates.lat} 
                  lng={this.state.coordinates.lng} 
                />
            </GoogleMapReact>
        </div>
        <ProductSelection availableProducts={this.state.products}/>
        <RaisedButton 
            type="submit" 
            onClick={() => this.props.onLogout()}
            label="Logout" />
        <RaisedButton 
            type="submit" 
            onClick={() => {
                console.log("Order ride")
            }}
            label="Order ride" />
      </div>
    );
  }
}

class ProductSelection extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const numbers = this.props.availableProducts;
    const listItems = numbers.map((number) => {
      const favoritesIcon = <FontIcon className="material-icons">{number.name}</FontIcon>;
      return <BottomNavigationItem
        key={number.id}
        label="$5"
        icon={favoritesIcon}
        onClick={() => this.select(1)}
      />;
    });
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={1}>
          {listItems}
        </BottomNavigation>
      </Paper>);
  }
}



class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', pwd: ''};
  }

  render() {
    return (
      <form onSubmit={(event) => {
        this.props.onLoggedIn("authTokenValue");
        event.preventDefault();
      }}>
        <TextField hintText="Username" 
            value={this.state.value} 
            onChange={(event) => {
               this.setState({value: event.target.value}); 
            }}
            fullWidth={true} />
        <TextField hintText="Password" 
            value={this.state.pwd} 
            onChange={(event) => {
                this.setState({pwd: event.target.value});
            }} 
            fullWidth={true} />
        <RaisedButton 
            type="submit" 
            label="Login" 
            fullWidth={true} />
      </form>
    );
  }
}


