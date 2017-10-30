import { Component } from 'react';
import config from './config';
import queryString from 'query-string';


class DetailsBase extends Component {
  constructor(props) {
    super(props);

    this.fetchData();
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    // in the future, cancel any fetch requests: https://developers.google.com/web/updates/2017/09/abortable-fetch
    this.mounted = false;
  }

  async fetchData() {
    const params = {
      where: `${config.fieldnames.ids[this.props[config.fieldnames.Type]]} = '${this.props[config.fieldnames.ID]}'`,
      f: 'geojson',
      outFields: '*',
      outSR: 4326,
      maxAllowableOffset: 0.0001
    };

    const response = await fetch(`${config.urls[this.props[config.fieldnames.Type]]}?${queryString.stringify(params)}`);
    if (response.ok && this.mounted) {
      const responseJson = await response.json();
      if (responseJson.features.length > 0) {
        const feature = responseJson.features[0];
        this.setState({...feature.properties, geojson: JSON.stringify(feature)});
      } else {
        // TODO: handle no features found
      }
    } else {
      // TODO: handle error in fetch request
    }
  }
}

export default DetailsBase;