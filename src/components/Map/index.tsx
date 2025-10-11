import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import styles from './styles'

export type Place = {
  name: string
}

export type MapProps = {
  place?: Place
}
const Map = ({ place }: MapProps) => (
  <MapContainer
    css={styles}
    center={[51.505, -0.09]}
    zoom={13}
    scrollWheelZoom={true}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[51.505, -0.09]} title={place?.name} />
  </MapContainer>
)

export default Map
