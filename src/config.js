const layerToken = '{layer}';
const aGOLServiceBase = `https://services1.arcgis.com/99lidPhWCzftIe9K/ArcGIS/rest/services/${layerToken}/FeatureServer/0/query`;

export default {
  poi_type_lookup: {
    l: 'Parks',
    h: 'Hiking',
    w: 'Boat Ramps'
  },
  urls: {
    l: aGOLServiceBase.replace(layerToken, 'UrbanParks'),
    h: aGOLServiceBase.replace(layerToken, 'Trails'),
    w: aGOLServiceBase.replace(layerToken, 'Boat_Ramps')
  },
  fieldnames: {
    Name: 'Name',
    ID: 'ID',
    Type: 'Type',
    ids: {
      l: 'ID',
      h: 'TrailID',
      w: 'BRID'
    }
  },
  metersPerMile: 1609.34
};
