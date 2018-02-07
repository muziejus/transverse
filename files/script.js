var map = L.map("map", {
  zoom: 4,
  minZoom: 1,
  maxZoom: 18,
  center: [39.83, -95.58]
});

L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
  attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> &copy; <a href='http://cartodb.com/attributions'>CartoDB</a>",
  subdomains: "abcd",
  maxZoom: 18
}).addTo(map);

var placesLayer = L.geoJSON(places, {
  pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng, getCircleMarker(feature));
  },
  onEachFeature: function(feature, layer) {
    layer.bindPopup(getPopupContent(feature));
    layer.bindTooltip(L.tooltip({opacity: 0.7}).setContent(feature.properties.name));
  }
});
map.addLayer(placesLayer);
map.fitBounds(placesLayer.getBounds());

function getCircleMarker(feature){
  var color;
  if (feature.properties.instances === 2) {
    color = "#fc8d62";
  } else {
    color = "#8da0cb";
  }
  return { radius: 6, 
    fillColor: color, 
    color: "#333",
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  };
}

function getPopupContent(feature){
  return "<h4>" + feature.properties.name + "</h4>";
}
