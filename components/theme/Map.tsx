import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function MapComponent(props: { zoom: any; location: any }) {
  return (
    <MapContainer
      bounds={props.location}
      boundsOptions={props.zoom}
      style={{ marginTop: "1rem", width: "80vw", height: "85vh" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={location}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
