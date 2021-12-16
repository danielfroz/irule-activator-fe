import { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { Alert, Button, Card, Col, ListGroup, ListGroupItem, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useApi } from '../../../hooks'
import * as r from '../../../reducers'

const iRules = () => {
  const api = useApi()
  const alert = useAlert()
  const dispatch = useDispatch()
  const [ errors, setErrors ] = useState({})
  const [ loading, setLoading ] = useState(false)
  const cluster = useSelector(state => state.maintenance.cluster)
  const iRule = useSelector(state => state.maintenance.iRule)
  const iRules = useSelector(state => state.maintenance.iRules)

  useEffect(async () => {
    if(!cluster) {
      // nothing to be done if cluster is not loaded yet
      return
    }
    setLoading(true)
    setErrors({})
    try {
      const res = await api.post('/maintenance/irule', { cluster })
      dispatch({ type: r.MAINTENANCE_IRULE_LISTED, iRules: res.iRules })
    }
    catch(error) {
      const err = JSON.parse(error.message)
      alert.error(error)
      setErrors({
        general: err.error
      })
    }
    finally {
      setLoading(false)
    }
  }, [ api, cluster ])

  function cancel() {
    dispatch({ type: r.MAINTENANCE_IRULE_CANCELLED })
  }

  function select(irule) {
    dispatch({ type: r.MAINTENANCE_IRULE_SELECTED, iRule: irule })
  }

  if(!cluster) {
    return null
  }

  if(iRule) {
    return (
      <Card border='primary' className='mb-2'>
        <Card.Header>iRules</Card.Header>
        <Card.Body>
          Selected: {iRule.name}
        </Card.Body>
        <Card.Footer>
          <Button variant='danger' onClick={cancel}>Cancel</Button>
        </Card.Footer>
      </Card>
    )
  }

  return (
    <Card border='primary' className='mb-2'>
      <Card.Header>iRules</Card.Header>
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
        {iRules && iRules.map((rule, idx) => 
          <ListGroupItem action={true} key={idx} onClick={() => select(rule)}>
            <Row>
              <Col><b>Name:</b> {rule.name}</Col>
              <Col><b>Partition:</b> {rule.partition}</Col>
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

export default iRules