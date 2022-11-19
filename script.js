let singapore = [ 1.29,103.85]; // #1 Singapore latlng
let map = L.map('map').setView(singapore, 13); // #2 Set the center point

// setup the tile layers
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);
loadData();
loadTracks();

async function loadData() {
    // important: axios.get requires a URL
    // in this case we are using a relative URL
    let response = await axios.get("cycling-path.geojson");

    // display the content of the geojson file on the map
    // response.data holds the actual data from the geojson file
    // the second paramter of L.geoJson is a configuration object
    const cyclingLayer = L.geoJson(response.data, {
        // onEachFeature is a fixed function name from Leaflet
        // it is called for each feature in response.data
        onEachFeature: function(feature, layer) {
            // feature paramter to the data of the feature
            console.log(feature);

            // layer parameter is the shape, line or marker etc. that will be added to the map
            layer.bindPopup(feature.properties.Description);
        }
    })

    // add the cycling layer to the map
    cyclingLayer.addTo(map);

    cyclingLayer.setStyle({
        color: 'red'
    })
}   

async function loadTracks() {
     // important: axios.get requires a URL
    // in this case we are using a relative URL
    let response = await axios.get("npark-tracks.geojson");

    // display the content of the geojson file on the map
    // response.data holds the actual data from the geojson file
    // the second paramter of L.geoJson is a configuration object
    const tracksLayer = L.geoJson(response.data, {
        // onEachFeature is a fixed function name from Leaflet
        // it is called for each feature in response.data
        onEachFeature: function(feature, layer) {
            // feature paramter to the data of the feature
            console.log(feature);

            // layer parameter is the shape, line or marker etc. that will be added to the map
            layer.bindPopup(feature.properties.Description);
        }
    })

    // add the cycling layer to the map
    tracksLayer.addTo(map);

    tracksLayer.setStyle({
        color: 'blue'
    })

}