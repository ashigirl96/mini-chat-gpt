import { NextPageWithLayout } from '~/pages/_app'
import { useRouter } from 'next/router'

const TimelineViewPage: NextPageWithLayout = () => {
  const router = useRouter()
  return <div>TimelineViewPage {router.query.id}</div>
}

export default TimelineViewPage
