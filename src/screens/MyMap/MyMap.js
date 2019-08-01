import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  TextInput
} from "react-native";

import { PermissionsAndroid } from "react-native";
// import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, ProviderPropType,  Callout, PROVIDER_GOOGLE } from "react-native-maps";
// import console = require('console');

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = -6.3158614;
const LONGITUDE = 106.6483111;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

class MyMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      statusBarHeight: null,
      marker: null,
      markers: [],
    };
  }
  async componentDidMount (){
    await this._mapPermissions()
    this._getData()
  }

 async _mapPermissions(){
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the map');
      } else {
        console.log('map permission denied');
      }
      
    } catch (err) {
      console.warn(err);
    }
  }
  _getData(){
    this.setState({
      markers: [
        {
            "id": 0,
            "name": "mawar",
            "coordinate": {
                "longitude": 106.64677049964666,
                "latitude": -6.31629592931006
            }
        }, {
            "id": 1,
            "name": "melati",
            "coordinate": {
                "longitude": 106.6499650105834,
                "latitude": -6.314788345274963
            }
        },{
            "id": 2,
            "name": "kamboja",
            "coordinate": {
                "longitude": 106.65026843547821,
                "latitude": -6.318779567792185
            }
        },{
            "id": 3,
            "name": "tulip",
            "coordinate": {
                "longitude": 106.64684191346169,
                "latitude": -6.314220834055488
            }
        },{
            "id": 4,
            "name": "anggrek",
            "coordinate": {
                "longitude": 106.64755571633577,
                "latitude": -6.319311417445766
            }
        }
    ],
    });
  }
  _watchLocation = async () => {
    await navigator.geolocation.watchPosition(position => {
      this.setState({ coords: position.coords, loading: false });
    });
  };
  _getLocation = async () => {
    await navigator.geolocation.getCurrentPosition(position => {
      // this.setState({ coords: position.coords, loading: false });
      const region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.012,
        longitudeDelta: 0.01
      };
      this.map.animateToRegion(region, 500);
      console.log(region)
    });
  };

  render() {
    console.log(this.state.markers);
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
          region={this.state.region}
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={false}
          rotateEnabled={false}
          showsCompass={false}
          ref={map => (this.map = map)}
        >
          {/* {this.state.marker != null ? (
            <Marker
              title={this.state.marker.key}
              key={this.state.marker.key}
              coordinate={this.state.marker.coordinate}
            />
          ) : (
            <View />
          )} */}
          {this.state.markers.map(marker => (
            <Marker
              key={marker.id}
              title={marker.name}
              coordinate={marker.coordinate}
            />
          ))}
        </MapView>
        <View style={styles.searchWrapper}>
          <TextInput
            placeholder="Search your future"
            style={styles.searchBar}
          />
        </View>
        <TouchableHighlight 
          style={styles.buttonMyLocContainer}
          underlayColor="rgb(255, 91, 77)"
          onPress={this._getLocation}>
          <Text style={styles.buttonText}> My </Text>
        </TouchableHighlight>

        <TouchableHighlight 
          style={styles.buttonCheckContainer}
          underlayColor="rgb(255, 91, 77)"
          onPress={()=>alert('Check out next Time!')}>
          <Text style={styles.buttonText}> Check </Text>
        </TouchableHighlight>
        {/* <View style={styles.buttonContainer}>
          <View style={styles.bubble}>
            {this.state.marker != null ? (
              this.state.marker.key == null ? (
                <Text>
                  {`${this.state.marker.coordinate.latitude.toPrecision(7)}, ${this.state.marker.coordinate.longitude.toPrecision(7)}`}
                </Text>) : (<Text>{`${this.state.marker.key}`}</Text>)
            ) : (<View />)}
          </View>
        </View> */}
      </View>
    );
  }
}

MyMap.propTypes = {
  provider: ProviderPropType
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 30
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  buttonText: {
    color:'#fff'
  },
  buttonCheckContainer: {
    backgroundColor:"rgb(235, 67, 52)",
    width:60,
    height:60,
    borderRadius:60/2,
    position:'absolute', 
    right:10,
    bottom:20,
    justifyContent:'center',
    alignItems:'center',
  },
  buttonText: {
    color:'#fff'
  },
  buttonMyLocContainer: {
    backgroundColor:"rgb(235, 67, 52)",
    width:40,
    height:40,
    borderRadius:40/2,
    position:'absolute', 
    right:10,
    bottom:100,
    justifyContent:'center',
    alignItems:'center',
  },
  searchWrapper: {
    width: "100%",
    paddingHorizontal: 10,
    top: 20,
    position: "absolute"
  },
  searchBar: {
    paddingLeft: 20,
    backgroundColor: "white",
    borderRadius: 5,
    width: "100%"
  }
});

export default MyMap;
