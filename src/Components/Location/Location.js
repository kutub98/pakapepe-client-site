import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import L, { circle } from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

import icon from "../../exactlocation";

// Cordinates of Marcillac
const center = [45.269169177925754, -0.5231516014256281];
const purpleOptions = { color: "white"};

function LeafletgeoSearch() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState(null)
  const map = useMap();
  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      marker: {
        icon
      }
    });

   
    map.locate().on('locationfound', function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
        setBbox(e.bounds.toBBoxString().split(","));
        console.log( e.bounds)
    });
    map.addControl(searchControl, function(e){
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
    });
  }, [map]);
}

class Location extends React.Component {
  render() {
    return (
      <div id="mapid">
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "100vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LeafletgeoSearch />
        </MapContainer>
      </div>
    );
  }
}

export default Location;
