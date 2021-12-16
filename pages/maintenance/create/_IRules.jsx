import { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { Button, Card, Col, ListGroup, ListGroupItem, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useApi } from '../../../hooks'
import * as r from '../../../reducers'

const iRules = () => {
  const api = useApi()
  const alert = useAlert()
  const dispatch = useDispatch()
  const [ loading, setLoading ] = useState(false)
  const cluster = useSelector(state => state.maintenance.cluster)
  const iRules = useSelector(state => state.maintenance.iRules)

  useEffect(async () => {
    if(!cluster) {
      // nothing to be done if cluster is not loaded yet
      return
    }
    setLoading(true)
    try {
      const res = await api.post('/maintenance/irule', { cluster })
      dispatch({ type: r.MAINTENANCE_IRULE_LISTED, iRules: res.iRules })
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
      <Card.Header>iRules</Card.Header>
      {loading && 
        <Card.Body>
          <Spinner animation='border' size='sm'/>
        </Card.Body>
      }
      <ListGroup variant='flush'>
        {iRules && iRules.map((rule, idx) => 
          <ListGroupItem action={true} key={idx}>
            <Row>
              <Col><b>Name:</b> {rule.name}</Col>
              <Col><b>Partition:</b> {rule.partition}</Col>
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

export default iRules