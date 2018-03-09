const robinMap = L.map("robin-vote");
const oedipaMap = L.map("oedipa-maas");
const robinTile = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
const oedipaTile = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
// const osmFrance = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
//     maxZoom: 20,
//       attribution: '&copy; Openstreetmap France | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// });
robinTile.addTo(robinMap);
oedipaTile.addTo(oedipaMap);
const nyu = [40.73046499853991, -73.99250799849149];
robinMap.setView(nyu, 13);
oedipaMap.setView(nyu, 13);
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
robinMap.fitBounds(robinLayer.getBounds());
robinLayer.eachLayer((l) => l.openTooltip());
const oedipaLayer = L.geoJson(oedipaPoints, {
  pointToLayer(f, ll){ return L.circleMarker(ll).bindTooltip(f.properties.name); }
});
oedipaLayer.addTo(oedipaMap);
oedipaMap.fitBounds(oedipaLayer.getBounds());
oedipaLayer.eachLayer((l) => l.openTooltip());
