// Add console.log to check to see if our code is working.
console.log('working');

// we create the tile layer that will be the background of our map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11', // shows the streets on the map
    // id: 'mapbox/dark-v10', // use dark theme
    // id: 'mapbox/satellite-streets-v11', // use satellite theme
    // id: 'mapbox/light-v10', // use light theme
    // id: 'mapbox/navigation-night-v1', // use navigation at night
    // id: 'mapbox/outdoors-v11', // use navigation at night
    accessToken: API_KEY
});

// we create the dark view tile layer that will be an option for our map
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox/satellite-streets-v11',
accessToken: API_KEY
});
// other map styles available under 'id':
// mapbox/streets-v11
// mapbox/outdoors-v11
// mapbox/light-v10
// mapbox/dark-v10
// mapbox/satellite-v9
// mapbox/satellite-streets-v11
// mapbox/navigation-day-v1
// mapbox/navigation-night-v1

// Create the map object with a center and zoom level.
let map = L.map('mapid',{
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// create the earthquake layer for map
let earthquakes = new L.layerGroup();

// create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
};

// define an object that contains the overlays
// this overlay will be visible all the time
let overlays = {
    "Earthquakes": earthquakes,
};


// pass our map layer into our layers control and add the layers control to the map
L.control.layers(baseMaps, overlays).addTo(map);

// Add GeoJSON data.
// Accessing the airport GeoJSON URL
let quakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// create a style for the lines
// let myStyle = {
//     color: 'black',
//     weight: 2,
//     fillColor: 'orange'
// }

// // Grabbing our GeoJSON data
d3.json(quakeUrl).then(function(data) {
    console.log(data);
    // creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
        style: styleInfo,  // why not styleInfo(feature)?
        // turn each feature into a circleMarker on the map
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        // create a popup for each circleMarker
        onEachFeature: function(feature, layer) {
            layer.bindPopup('<h2>Magnitude: ' + feature.properties.mag + '</h2><h2>Location: ' + feature.properties.place + '</h2>')
        }
    })
        .addTo(earthquakes); // add layers to earthquakes


    // then add the earthquake layer to the map
    earthquakes.addTo(map);

    // This function returns the style data for each of the earthquakes we plot on
    // the map. We pass the magnitude of the earthquake into a function
    // to calculate the radius.
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        }
    }

    // This function determines the radius of the earthquake marker based on its magnitude.
    // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    }

    function getColor(magnitude) {
        if (magnitude > 5) {
            return "#ea2c2c";
          }
          if (magnitude > 4) {
            return "#ea822c";
          }
          if (magnitude > 3) {
            return "#ee9c00";
          }
          if (magnitude > 2) {
            return "#eecc00";
          }
          if (magnitude > 1) {
            return "#d4ee00";
          }
          return "#98ee00";
    }
});