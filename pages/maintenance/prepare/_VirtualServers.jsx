import { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { Alert, Button, Card, Col, ListGroup, ListGroupItem, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useApi } from '../../../hooks'
import * as r from '../../../reducers'

const VirtualServers = () => {
  const api = useApi()
  const alert = useAlert()
  const dispatch = useDispatch()
  const [ errors, setErrors ] = useState({})
  const [ loading, setLoading ] = useState(false)
  const cluster = useSelector(state => state.maintenance.cluster)
  const virtualServer = useSelector(state => state.maintenance.virtualServer)
  const virtualServers = useSelector(state => state.maintenance.virtualServers)

  useEffect(async () => {
    if(!cluster) {
      // cluster not yet set... nothing to be done...
      return;
    }
    setErrors({})
    setLoading(true)
    try {
      const res = await api.post('/maintenance/virtualserver', { cluster })
      dispatch({ type: r.MAINTENANCE_VIRTUAL_SERVERS_LISTED, virtualServers: res.virtualServers })
    }
    catch(error) {
      const err = JSON.parse(error.message)
      alert.error(error)
      setErrors({ general: err.error })
    }
    finally {
      setLoading(false)
    }
  }, [ api, cluster ])

  function cancel() {
    dispatch({ type: r.MAINTENANCE_VIRTUAL_SERVER_CANCELLED })
  }

  function select(vs) {
    dispatch({ type: r.MAINTENANCE_VIRTUAL_SERVER_SELECTED, virtualServer: vs })
  }

  if(!cluster) {
    return null
  }

  if(virtualServer) {
    return (
      <Card border='primary' className='mb-2'>
        <Card.Header>Virtual Servers</Card.Header>
        <Card.Body>
          Selected: {virtualServer.name}
        </Card.Body>
        <Card.Footer>
          <Button variant='danger' onClick={cancel}>Cancel</Button>
        </Card.Footer>
      </Card>
    )
  }

  return (
    <Card border='primary' className='mb-2'>
      <Card.Header>Virtual Servers</Card.Header>
      {loading &&
        <Card.Body>
          <Spinner animation='border' size='sm'/>
        </Card.Body>
      }
      {errors && errors.general &&
        <Card.Body>
          <Alert variant='danger'>
            Code: {errors.general.code}, Description: {errors.general.message}
          </Alert>
        </Card.Body>
      }
      <ListGroup variant='flush'>
        {virtualServers && virtualServers.map((vs, idx) => 
          <ListGroupItem action={true} key={idx} onClick={() => select(vs)}>
            <Row>
              <Col><b>Name:</b> {vs.name}</Col>
              <Col>
                <b>iRules:</b>
                {(!vs.irules || vs.irules.length == 0) && 
                  <Row>
                    <Col>-</Col>
                  </Row>
                }
                {vs.irules && vs.irules.map((irule, idx) => 
                  <Row key={idx}>
                    <Col>{irule.partition}~{irule.name}</Col>
                  </Row>
                )}
              </Col>
            </Row>
          </ListGroupItem>
        )}
      </ListGroup>
      {!loading && !errors && !errors.general &&
        <Card.Footer>
          <Button>Save</Button>
        </Card.Footer>
      }
    </Card>
  )
}

export default VirtualServers