import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap"
import * as r from '../../../reducers'

const Maintenance = () => {
  const dispatch = useDispatch()
  const [ errors, setErrors ] = useState({})
  const [ name, setName ] = useState('')
  const [ key, setKey ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const base = useSelector(state => state.maintenance.base)

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
    const base = {
      name,
      key
    }
    dispatch({ type: r.MAINTENANCE_BASE_SAVED, base })
    setLoading(false)
  }

  function cancel() {
    dispatch({ type: r.MAINTENANCE_BASE_CANCELLED })
  }

  if(base) {
    return (
      <Card border='primary' className='mb-2'>
        <Card.Header>Maintenance Info</Card.Header>
        <Card.Body>
          <Row>
            <Col>Name: {base.name}</Col>
            <Col>Key: {base.key ? base.key: 'to be generated'}</Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Button variant='danger' onClick={cancel}>Cancel</Button>
        </Card.Footer>
      </Card>
    )
  }

  return (
    <Form onSubmit={(e) => {
      e.preventDefault()
      save()
    }}>
      <Card border='primary' className='mb-2'>
        <Card.Header>Maintenance Info</Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)}/>
              <div>This name shall be used as facilitator; for identification</div>
              {errors.name &&
                <div className='error'>{errors.name}</div>
              }
            </Col>
            <Col md={6}>
              <Form.Label>Key</Form.Label>
              <Form.Control type='text' value={key} onChange={(e) => setKey(e.target.value)}/>
              <div>Optional: only if you want reuse past key; or service restarted and key needs to be recreated</div>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Button type='submit' disabled={loading}>
            {loading ? <Spinner animation='border' size='sm'/>: 'Save'}
          </Button>
        </Card.Footer>
      </Card>
    </Form>
  )
}

export default Maintenance