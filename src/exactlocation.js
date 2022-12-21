import L from "leaflet";

export default L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
  
});

