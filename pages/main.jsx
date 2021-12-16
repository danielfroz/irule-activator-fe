import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import Layout from '../components/Layout'

const Main = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/maintenance')
  }, [ router ])

  return (
    <Layout>
      <Button onClick={() => router.push('/maintenance')}>Maintenances</Button>
    </Layout>
  )
}

export default Main