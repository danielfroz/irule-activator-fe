import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useApi } from '../../hooks'
import { Alert, Button, Card, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap'
import Layout from '../../components/Layout'
import * as r from '../../reducers'

const Start = () => {
  const api = useApi()
  const alert = useAlert()
  const dispatch = useDispatch()
  const router = useRouter()
  const key = useSelector(state => state.developer.key)
  const [ errors, setErrors ] = useState({})
  const [ token, setToken ] = useState('')
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    setToken(key ? key.trim(): '')
  }, [ key ])

  function start() {
    setLoading(true)

    const errors = {}
    setErrors(errors)
    if(!token || token === '') {
      errors.token = 'Field required'
    }
    if(Object.keys(errors).length > 0) {
      setLoading(false)
      setErrors(errors)
      return
    }

    api.post('/developer/start', { key: token })
      .then(result => {
        alert.info('Maintenance Started... please check the status...')
        dispatch({ type: r.DEVELOPER_STARTED, maintenance: result.maintenance })
        setLoading(false)
      })
      .catch(error => {
        setErrors({ general: error.message })
        alert.error(error)
        setLoading(false)
      })
  }

  return (
    <Layout>
      <Row className='mt-5'>
        <Col md={6}>
          <Card>
            <Card.Body>
              <p>
                Enter the Maintenance Key here.<br/>
                If you don't have it... talk to Deloitte F5 team.
              </p>
              <Form onSubmit={(e) => {
                e.preventDefault()
                start()
              }}>
                <Row>
                  <Col>
                    <InputGroup>
                      <Form.Control type='text' value={token} onChange={(e) => setToken(e.target.value)}/>
                      <Button disabled={loading} type='submit'>
                        {loading ? <Spinner animation='border' size='sm'/>: 'Initiate'}
                      </Button>
                      <Button type='button' onClick={() => router.push('/')}>Abort</Button>
                    </InputGroup>
                    {errors.token &&
                      <div className='error'>{errors.token}</div>
                    }
                  </Col>
                </Row>
                {errors.general &&
                  <Row>
                    <Col>
                      <Alert variant='danger'>{errors.general}</Alert>
                    </Col>
                  </Row>
                }
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
    </Layout>
  )
}

export default Start