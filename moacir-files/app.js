$("ul").after( $("#biblography") ).addClass("bibliography");


const tileUrl = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
// const tileUrl = "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png";
const tileOptions = { maxZoom: 20, attribution: '&copy; Openstreetmap France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' };
// const tileUrl = "http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png";
// const tileOptions = { maxZoom: 18, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' };
const robinMap = L.map("robin-vote").setView([0,0], 13);
L.tileLayer(tileUrl, tileOptions).addTo(robinMap);
const oedipaMap = L.map("oedipa-maas").setView([0,0], 13);
L.tileLayer(tileUrl, tileOptions).addTo(oedipaMap);
const robinPoints = {
   "type": "FeatureCollection",
   "features": [
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ 2.34707,48.85202 ]
    },
    "properties": {
    "name":"St. Julien le Pauvre"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ 2.33449,48.85395 ]
    },
    "properties": {
    "name":"St. Germain des Prés"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ 2.3193114,48.858531 ]
    },
    "properties": {
    "name":"Ste. Clothilde"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ 2.3020072, 48.877611 ]
    },
    "properties": {
    "name":"Russian church"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ 2.3982236,48.8419014 ]
    },
    "properties": {
    "name":"rue Picpus"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ 2.3966586,48.8438183 ]
    },
    "properties": {
    "name":"L'Adoration Perpétuelle"
    }
  }
]
};
const oedipaPoints = {
   "type": "FeatureCollection",
   "features": [
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -122.408,37.7841 ]
    },
    "properties": {
    "name":"Market"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -122.41886,37.7791 ]
    },
    "properties": {
    "name":"City Hall"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -122.41747,37.77937 ]
    },
    "properties": {
    "name":"Civic Center"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -122.3954958,37.7881209 ]
    },
    "properties": {
    "name":"First Street"
    }
  },
  {
    "type": "Feature",
    "geometry": {
       "type": "Point",
       "coordinates":  [ -122.2708,37.80437 ]
    },
    "properties": {
    "name":"Oakland"
    }
  }
]
};
const robinLayer = L.geoJson(robinPoints, {
  pointToLayer(f, ll){ return L.circleMarker(ll).bindTooltip(f.properties.name); }
});
robinLayer.addTo(robinMap);
robinLayer.eachLayer((l) => l.openTooltip());
robinMap.fitBounds(robinLayer.getBounds());

const oedipaLayer = L.geoJson(oedipaPoints, {
  pointToLayer(f, ll){ return L.circleMarker(ll).bindTooltip(f.properties.name); }
});
oedipaLayer.addTo(oedipaMap);
oedipaLayer.eachLayer((l) => l.openTooltip());
oedipaMap.fitBounds(oedipaLayer.getBounds());
