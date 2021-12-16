import { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { Button, Card, Col, ListGroup, ListGroupItem, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useApi } from '../../../hooks'
import * as r from '../../../reducers'

const VirtualServers = () => {
  const api = useApi()
  const alert = useAlert()
  const dispatch = useDispatch()
  const [ loading, setLoading ] = useState(false)
  const cluster = useSelector(state => state.maintenance.cluster)
  const virtualServers = useSelector(state => state.maintenance.virtualServers)

  useEffect(async () => {
    if(!cluster) {
      // cluster not yet set... nothing to be done...
      return;
    }
    setLoading(true)
    try {
      const res = await api.post('/maintenance/virtualserver', { cluster })
      dispatch({ type: r.MAINTENANCE_VIRTUAL_SERVERS_LISTED, virtualServers: res.virtualServers })
      setLoading(false)
    }
    catch(error) {
      setLoading(false)
      alert.error(error)
    }
  }, [ api, cluster ])

  if(!cluster) {
    return null
  }

  return (
    <Card border='primary' className='mb-2'>
      <Card.Header>Virtual Servers</Card.Header>
      {loading && 
        <Card.Body>
          <Spinner animation='border' size='sm'/>
        </Card.Body>
      }
      <ListGroup variant='flush'>
        {virtualServers && virtualServers.map((vs, idx) => 
          <ListGroupItem action={true} key={idx}>
            <Row>
              <Col><b>Name:</b> {vs.name}</Col>
              <Col>
                <b>iRules:</b>
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
      <Card.Footer>
        <Button>Save</Button>
      </Card.Footer>
    </Card>
  )
}

export default VirtualServers