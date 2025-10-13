import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import styles from './styles'

export type Place = {
  id: string
  name: string
  location: {
    latitude: number
    longitude: number
  }
}

export type MapProps = {
  places?: Place[]
}
const Map = ({ places }: MapProps) => (
  <MapContainer
    css={styles}
    center={[-23.5488, -46.6391]}
    zoom={5}
    scrollWheelZoom={true}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {places?.map(({ id, name, location }) => {
      const { latitude, longitude } = location

      return (
        <Marker
          key={`place-${id}`}
          position={[latitude, longitude]}
          title={name}
        />
      )
    })}
  </MapContainer>
)
export default Map
