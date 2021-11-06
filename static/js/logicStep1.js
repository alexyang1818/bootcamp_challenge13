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

// create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
};

// Create the map object with a center and zoom level.
let map = L.map('mapid',{
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// pass our map layer into our layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map);

// Add GeoJSON data.
// Accessing the airport GeoJSON URL
let quakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// create a style for the lines
let myStyle = {
    color: 'blue',
    weight: 1,
    fillColor: 'yellow'
}

// // Grabbing our GeoJSON data
d3.json(quakeUrl).then(function(data) {
    console.log(data);
    // creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
        // style: myStyle,
        // onEachFeature: function(feature, layer) {
        //     // console.log(layer);
        //     layer.bindPopup('<h2>Neighborhood: ' + feature.properties.AREA_NAME + '</h2>');
        // }
    })
        .addTo(map);
});