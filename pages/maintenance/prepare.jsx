import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { Button, ButtonGroup, Card } from "react-bootstrap"
import Layout from "../../components/Layout"
import Cluster from './prepare/_Cluster'
import Base from './prepare/_Base'
import IRules from './prepare/_IRules'
import VirtualServers from './prepare/_VirtualServers'

const Prepare = () => {
  const router = useRouter()
  const base = useSelector(state => state.maintenance.base)
  const virtualServer = useSelector(state => state.maintenance.virtualServer)
  const iRule = useSelector(state => state.maintenance.iRule)

  return (
    <Layout>
      <ButtonGroup className='me-2 mb-2'>
        <Button onClick={() => router.push('/maintenance')}>Back</Button>
      </ButtonGroup>

      <Cluster/>
      <VirtualServers/>
      <IRules/>
      <Base/>

      {base && virtualServer && iRule &&
        <Card border='primary' className='mb-2'>
          <Card.Body>
            <Button onClick={() => router.push('/maintenance/create')}>Next</Button>
          </Card.Body>
        </Card>
      }
    </Layout>
  )
}

export default Prepare