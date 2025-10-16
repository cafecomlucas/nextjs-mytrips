import dynamic from 'next/dynamic'
import { InfoOutline } from '@emotion-icons/evaicons-outline'

import LinkWrapper from '@/components/LinkWrapper'

const Map = dynamic(() => import('@/components/Map'), { ssr: false })

export default function Home() {
  const place = {
    id: '154',
    name: 'Belo Horizonte',
    location: {
      latitude: -19.9167,
      longitude: -43.9333
    }
  }
  return (
    <>
      <LinkWrapper href="/about">
        <InfoOutline size={32} aria-label="About" />
      </LinkWrapper>
      <Map places={[place]} />
    </>
  )
}
