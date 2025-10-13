'use client'

import dynamic from 'next/dynamic'

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
  return <Map places={[place]} />
}
