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

const svgWidth = .75 * $(window).width(); 
const svgHeight = .75 * $(window).height(); 
$("svg#lot49-raw-diff").attr("width", svgWidth);
$("svg#lot49-raw-diff").attr("height", svgHeight);

  const svg = d3.select("#lot49-raw-diff"),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  const x = d3.scaleLinear()
    .rangeRound([0, width]);
  const y = d3.scaleLinear()
    .rangeRound([height, 0]);
  const line = d3.line()
    .x(function(d) { return x(d.page); })
    .y(function(d) { return y(d.diff); });

  d3.tsv("/moacir-files/lot49-data.tsv", function(d) {
    return d;
  }, function(error, data) {
    if (error) throw error;

    // x.domain(d3.extent(data, function(d) { return d.page; }));
    // y.domain(d3.extent(data, function(d) { return d.diff; }));
    x.domain([9, 200]);
    y.domain([0, 164]);

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
      .select(".domain")
        .remove();

    g.append("g")
        .call(d3.axisLeft(y))
      .append("text")
        .attr("fill", "#fff")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("y-axis");

    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);
  });
