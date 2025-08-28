import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function EarthquakeMap({ earthquakes }) {
  return (
    <MapContainer
      center={[20, 77]} // India-centered map, change if needed
      zoom={3}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {earthquakes.map((eq, index) => (
        <Marker
          key={index}
          position={[eq.geometry.coordinates[1], eq.geometry.coordinates[0]]}
        >
          <Popup>
            <strong>Magnitude:</strong> {eq.properties.mag} <br />
            <strong>Location:</strong> {eq.properties.place}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default EarthquakeMap;
