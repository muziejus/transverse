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
