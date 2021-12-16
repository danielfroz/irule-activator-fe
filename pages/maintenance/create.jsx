import { useRouter } from "next/router"
import { Fragment, useState } from "react"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import { Button, ButtonGroup, Card, Col, Form, Row, Spinner } from "react-bootstrap"
import { useApi } from '../../hooks'
import * as r from '../../reducers'
import Layout from "../../components/Layout"
import Cluster from './create/_Cluster'
import Maintenance from './create/_Maintenance'
import IRules from './create/_IRules'
import VirtualServers from './create/_VirtualServers'

const Create = () => {
  const alert = useAlert()
  const api = useApi()
  const dispatch = useDispatch()
  const router = useRouter()
  const [ errors, setErrors ] = useState({})
  const [ name, setName ] = useState('')
  const [ key, setKey ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const cluster = useSelector(state => state.maintenance.cluster)
  const base = useSelector(state => state.maintenance.base)
  const virtualServer = useSelector(state => state.maintenance.virtualServer)
  const iRule = useSelector(state => state.maintenance.iRule)

  function reload() {
    // this will trigger useEffect() on create/_Cluster.jsx code...
    // so all other components.
    dispatch({ type: r.MAINTENANCE_CLEARED })
  }

  function save() {
    setLoading(true)
    const errors = {}
    setErrors(errors)
    if(name === '')
      errors.name = 'Field required'
    if(Object.keys(errors).length > 0) {
      setLoading(false)
      setErrors(errors)
      return
    }
    api.post('/maintenance/create', { name, key })
      .then(result => {
        alert.info('Maintenance Created')
        dispatch({ type: r.MAINTENANCE_CREATED, maintenace: result })
        router.push('/maintenance')
        setLoading(false)
      })
      .catch(error => {
        console.error('error caught: %o', error)
        alert.error(error.message)
        setLoading(false)
      })
  }

  return (
    <Layout>
      <ButtonGroup className='me-2 mb-2'>
        <Button onClick={() => router.push('/maintenance')}>Back</Button>
      </ButtonGroup>
      <ButtonGroup className='me-2 mb-2'>
        <Button onClick={() => reload()}>Reload</Button>
      </ButtonGroup>

      <Cluster/>
      <VirtualServers/>
      <IRules/>
      <Maintenance/>

      {base && virtualServer && iRule &&
        <Card>
          <Card.Header>Verify all Clusters</Card.Header>
          <Card.Body>
            <Button>Verify</Button>
          </Card.Body>
        </Card>
      }
    </Layout>
  )
}

export default Create