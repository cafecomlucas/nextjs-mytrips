import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import styles from './styles'
import { useRouter } from 'next/router'
import { mapBoxApiKey, mapBoxUrl } from '@/config/mapbox'

export type Place = {
  id: string
  name: string
  slug: string
  location: {
    latitude: number
    longitude: number
  }
}
export type MapProps = {
  places?: Place[]
}

const CustomMap = () =>
  mapBoxApiKey ? (
    <TileLayer
      url={mapBoxUrl}
      attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://www.mapbox.com/about/maps/">Mapbox</a> <strong><a href="https://labs.mapbox.com/contribute/" target="_blank">Improve this map</a></strong>'
      tileSize={512}
      zoomOffset={-1}
    />
  ) : (
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  )

const Map = ({ places }: MapProps) => {
  const router = useRouter()

  return (
    <MapContainer
      css={styles}
      center={[-21.245, -44.999]}
      zoom={4}
      scrollWheelZoom={true}
    >
      <CustomMap />

      {places?.map(({ id, name, location, slug }) => {
        const { latitude, longitude } = location
        const href = `/place/${slug}`

        const HandleClick = () => router.push(href)

        return (
          <Marker
            key={`place-${id}`}
            position={[latitude, longitude]}
            title={name}
            eventHandlers={{ click: HandleClick }}
          />
        )
      })}
    </MapContainer>
  )
}
export default Map
