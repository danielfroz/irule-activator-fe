import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import { Button, ButtonGroup, Card, ListGroup } from "react-bootstrap"
import { useApi } from '../../hooks'
import * as r from '../../reducers'
import Layout from "../../components/Layout"

const Create = () => {
  const alert = useAlert()
  const api = useApi()
  const dispatch = useDispatch()
  const router = useRouter()
  const [ loading, setLoading ] = useState(false)
  const base = useSelector(state => state.maintenance.base)
  const virtualServer = useSelector(state => state.maintenance.virtualServer)
  const iRule = useSelector(state => state.maintenance.iRule)

  async function create() {
    if(!base)
      return alert.info('base not configured')
    if(!virtualServer)
      return alert.error('Virtual Server not configured')
    if(!iRule)
      return alert.error('iRule not configured')

    setLoading(true)
    const maintenance = {
      name: base.name,
      key: base.key !== '' ? base.key: undefined,
      status: 'Created',
      virtualServer: virtualServer.name,
      iRule: iRule.name
    }

    try {
      const result = await api.post('/maintenance/create', { id: crypto.randomUUID(), maintenance })
      dispatch({ type: r.MAINTENANCE_CREATED, maintenance: result.maintenance })

      // let's trigger verify ... then push the user to the verification page...
      // verification request may fail... so we may log into the console for investigation
      // and check the backend's log!
      api.post('/maintenance/verify', { id: crypto.randomUUID(), key: result.maintenance.key })
        .catch(error => alert.error(error))

      setLoading(false)
      router.push('/maintenance/verify')
    }
    catch(error) {
      setLoading(false)
      alert.error(error)
    }
  }

  return (
    <Layout>
      <Card border='primary' className='mb-2'>
        <Card.Header>Confirm the selected configuration and let's roll!</Card.Header>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            Maintenance: {base.name}
          </ListGroup.Item>
          <ListGroup.Item>
            Virtual Server: {virtualServer.name}
          </ListGroup.Item>
          <ListGroup.Item>
            iRule: {iRule.name}
          </ListGroup.Item>
        </ListGroup>
        <Card.Footer>
          <ButtonGroup>
            <Button variant='primary' onClick={create}>Create</Button>
            <Button variant='danger' onClick={() => router.push('/maintenance/prepare')}>Cancel / Adjust</Button>
          </ButtonGroup>
        </Card.Footer>
      </Card>
    </Layout>
  )
}

export default Create