import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { Button, ButtonGroup } from 'reactstrap';
import List from './List';

import 'mapbox-gl/dist/mapbox-gl.css';
import './css/MapView.css';


mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
const VIEWS = { MAP: 'MAP', LIST: 'LIST' };
const LAYERS = { POINTS_OF_INTEREST: 'points-of-interest' };
const POI_DATA = '/PointsOfInterest.json';

class MapView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentView: VIEWS.MAP,
      findingCurrentLocation: false,
      featuresInCurrentExtent: [],
      currentLocation: null
    };
  }
  loadPointsOfInterest() {
    this.map.addLayer({
      id: LAYERS.POINTS_OF_INTEREST,
      type: 'circle',
      source: {
        type: 'geojson',
        data: POI_DATA
      },
      paint: {
        'circle-radius': 8,
        'circle-color': {
          property: 'Type',
          type: 'categorical',
          stops: [
            ['h', '#e7eb3f'],
            ['l', '#3feb9e'],
            ['w', '#3f6feb']
          ]
        },
        'circle-stroke-width': 1
      }
    });

    const onDataLoad = (mapDataEvent) => {
      if (mapDataEvent.isSourceLoaded &&
          mapDataEvent.source.data === POI_DATA &&
          mapDataEvent.sourceDataType !== 'metadata') {
        this.onMapExtentChange();
        this.map.off('data', onDataLoad);
      }
    };

    this.map.on('sourcedata', onDataLoad);
  }
  componentDidMount() {
    if (this.props.match.params.extent) {
      this.initMap(this.props.match.params.extent.split(',').map(parseFloat));
    } else {
      this.setState({ findingCurrentLocation: true });

      navigator.geolocation.getCurrentPosition((position) => {
        this.initMap([position.coords.longitude, position.coords.latitude]);
        this.setState({ findingCurrentLocation: false });
      }, (error) => {
        console.error(error);
        this.initMap([-111.8, 40.55]); // east side of salt lake valley
        this.setState({ findingCurrentLocation: false });
      });
    }
  }
  initMap(center) {
    this.setState({ currentLocation: center });
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/outdoors-v10',
      center: center,
      zoom: 12
    });
    this.map.addControl(new mapboxgl.NavigationControl());

    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });
    geolocateControl.on('geolocate', position => {
      this.setState({ currentLocation: [position.coords.longitude, position.coords.latitude] });
    });
    this.map.addControl(geolocateControl);
    this.map.on('load', this.loadPointsOfInterest.bind(this));
    this.map.on('moveend', this.onMapExtentChange.bind(this));
  }
  onMapExtentChange() {
    const keys = {};
    const features = this.map.queryRenderedFeatures({layers:[LAYERS.POINTS_OF_INTEREST]}).filter((f) => {
      if (keys[f.id]) {
        return false
      }
      keys[f.id] = true;
      return true;
    });

    this.setState({
      featuresInCurrentExtent: features
    });
  }
  onRadioButtonClick(currentView) {
    this.setState({currentView});
  }
  render() {
    return (
      <div className='map-view'>
        <ButtonGroup>
          <Button color='primary' onClick={() => this.onRadioButtonClick(VIEWS.MAP)} active={this.state.currentView === VIEWS.MAP}>View Map</Button>
          <Button color='primary' onClick={() => this.onRadioButtonClick(VIEWS.LIST)} active={this.state.currentView === VIEWS.LIST}>View List</Button>
        </ButtonGroup>
        { this.state.findingCurrentLocation && <span className='finding-text'>Finding your current location...</span> }
        <div ref={(el) => this.mapContainer = el} style={{display: (this.state.currentView === VIEWS.MAP) ? 'block': 'none'}}></div>
        { this.state.currentView === VIEWS.LIST && <List features={this.state.featuresInCurrentExtent} currentLocation={this.state.currentLocation} /> }
      </div>
    );
  }
}

export default MapView;
