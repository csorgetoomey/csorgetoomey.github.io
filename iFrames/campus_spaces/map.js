
var map = L.map('map').setView([47.655548, -122.303200], 15);

L.tileLayer('https://api.mapbox.com/styles/v1/csorge/cjvhhz99w0jnm1cq3per2445t/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Sources: UW Libraries',
    maxZoom: 18,
    accessToken: 'pk.eyJ1IjoiY3NvcmdlIiwiYSI6ImNqb3A2cGMwMzAxbTkzcW9meDIzMDE0ZHMifQ.R5gWO0aBEldQdqU0Nlir-Q'
}).addTo(map);

L.easyButton( 'fa-crosshairs', function(btn, map){
    map.setView(new L.LatLng(47.655548, -122.303200), 15);
}).addTo(map);

controlLayer = L.control.layers(null, null, {collapsed: true}).addTo(map);

//needs to be EPSG:4326 when exporting -> save as

//load this geojson from separate js script
var combined = L.geoJson(combined_spaces, {style: {stroke: false, fillColor: "white", fillOpacity: 0}}).addTo(map); //white

//green space
$.getJSON("CAMPUS_GEOJSONS/CAMPUS_GEOJSON_LANDSCAPE.geojson",function(data){
    var greenspace = L.geoJson(data, {style: {stroke: false, fillColor: "#036D81", fillOpacity: .8}}).addTo(map); //black
    controlLayer.addOverlay(greenspace, "Green Space");
});

//diversity space
$.getJSON("CAMPUS_GEOJSONS/CAMPUS_GEOJSON_DIVERSITY.geojson",function(data){
    var diversity = L.geoJson(data, {style: {stroke: false, fillColor: "#132438", fillOpacity: .8}}).addTo(map); //purple
    controlLayer.addOverlay(diversity, "Diversity Space");
});

//social space
$.getJSON("CAMPUS_GEOJSONS/CAMPUS_GEOJSON_SOCIAL.geojson",function(data){
    var social = L.geoJson(data, {style: {stroke: false, fillColor: "#fae88b", fillOpacity: .8}}).addTo(map); //green
    controlLayer.addOverlay(social, "Social Space");
});

//study space
$.getJSON("CAMPUS_GEOJSONS/CAMPUS_GEOJSON_STUDY.geojson",function(data){
    var study = L.geoJson(data, {style: {stroke: false, fillColor: "#E6433B", fillOpacity: .8}}).addTo(map); //red
    controlLayer.addOverlay(study, "Study Space");
});

//path space
$.getJSON("CAMPUS_GEOJSONS/CAMPUS_GEOJSON_PATHS.geojson",function(data){
    var paths = L.geoJson(data, {style: {stroke: false, fillColor: "#5EDB7E", fillOpacity: .8}}).addTo(map); //yellow
    controlLayer.addOverlay(paths, "ADA Connecting Space");
});

function clickHandler(e) {
    var html = '';
    var match = leafletPip.pointInLayer(e.latlng, combined, false);
    if(match.length) {
        for(var i = 0; i < match.length; i++) {
            html += match[i].feature.properties.space + "<br>"
        }
    }
    if(html) {
        map.openPopup(html, e.latlng);
    }
}

map.on("click", clickHandler);
