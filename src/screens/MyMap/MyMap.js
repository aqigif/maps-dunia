import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput
} from 'react-native';

import {PermissionsAndroid} from 'react-native'

import MapView, { Marker, ProviderPropType, Callout } from 'react-native-maps';
// import console = require('console');

const { width, height } = Dimensions.get('window');

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
        longitudeDelta: LONGITUDE_DELTA,
      },
      statusBarHeight:null,
      marker: null,
    };

  }

  
  onMapPress(e) {
    this.setState({
      marker: {
          coordinate: e.nativeEvent.coordinate,
          key: null,
        },
    });
  }

  onPoiPress(e) {
    this.setState({
      marker: {
          coordinate: e.nativeEvent.coordinate,
          key: e.nativeEvent.name,
        },
    });
  }

  render() {
    console.log(this.state.marker)
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          onPoiClick={(e)=>this.onPoiPress(e)}
          onLongPress={(e)=>this.onMapPress(e)}
        >
            {this.state.marker!=null ?
            (<Marker
              title={this.state.marker.key}
              key={this.state.marker.key}
              coordinate={this.state.marker.coordinate}
            />):<View/>
            }
        </MapView>
        {/* <View style={{width:'100%', paddingHorizontal:10, top:10, position:'absolute'}}>
          <TextInput placeholder="Search your ex" style={{paddingLeft:20,backgroundColor:'white', borderRadius:5, width:'100%'}}/>
        </View> */}
        <View style={styles.buttonContainer}>
          <View style={styles.bubble}>
          {this.state.marker!=null ? 
            this.state.marker.key==null?
              <Text>
                {`${this.state.marker.coordinate.latitude.toPrecision(7)}, ${this.state.marker.coordinate.longitude.toPrecision(7)}`}
              </Text>:<Text>
                {`${this.state.marker.key}`}
              </Text>:
            <View/>
          }
          </View>
        </View>
      </View>
    );
  }
}

MyMap.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom:30
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    paddingHorizontal: 12,
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  }
});

export default MyMap;