import dynamic from 'next/dynamic'
import { InfoOutline } from '@emotion-icons/evaicons-outline'

import LinkWrapper from '@/components/LinkWrapper'
import { MapProps } from '@/components/Map'

const Map = dynamic(() => import('@/components/Map'), { ssr: false })

export type HomeTemplateProps = MapProps

const HomeTemplate = ({ places }: HomeTemplateProps) => {
  return (
    <>
      <LinkWrapper href="/about">
        <InfoOutline size={32} aria-label="About" />
      </LinkWrapper>
      <Map places={places} />
    </>
  )
}

export default HomeTemplate
