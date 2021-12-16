import { useState } from "react"
import { useAlert } from "react-alert"
import { useDispatch } from "react-redux"
import { Button, ButtonGroup, Card, Col, Form, Row, Spinner } from "react-bootstrap"
import * as r from '../../../reducers'

const Maintenance = () => {
  const dispatch = useDispatch()
  const [ errors, setErrors ] = useState({})
  const [ name, setName ] = useState('')
  const [ key, setKey ] = useState('')
  const [ loading, setLoading ] = useState(false)

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
  }

  return (
    <Form onSubmit={(e) => {
      e.preventDefault()
      save()
    }}>
      <Card border='primary'>
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