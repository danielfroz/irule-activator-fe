import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch } from 'react-redux'
import { Button, Container, Col, Form, Row, Spinner, Card } from 'react-bootstrap'
import { useApi } from '../../hooks'
import * as r from '../../reducers'

const Login = () => {
  const api = useApi()
  const alert = useAlert()
  const dispatch = useDispatch()
  const router = useRouter()
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ errors, setErrors ] = useState({})
  const [ loading, setLoading ] = useState(false)

  function login() {
    setLoading(true)
    const errors = {}
    setErrors(errors)
    if(username === '') {
      errors.username = 'Field required'
    }
    if(password === '') {
      errors.password = 'Field required'
    }
    if(Object.keys(errors).length > 0) {
      setLoading(false)
      setErrors(errors)
      return
    }
    api.post('/auth/login', { username, password })
      .then(result => {
        dispatch({ type: r.AUTH_LOGIN, token: result.token })
        setLoading(false)
        router.push('/main')
      })
      .catch(error => {
        console.error('error: %o', error)
        alert.error(`Request failed: ${error.message}`)
        setLoading(false)
      })
  }

  return (
    <Form onSubmit={(e) => {
      e.preventDefault()
      login()
    }}>
      <Container>
        <Row className='mt-5'>
          <Col md={4}>
            <Card>
              <Card.Header>Administration login</Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' onChange={(e) => setUsername(e.target.value)}/>
                    {errors.username &&
                      <div className='error'>{errors.username}</div>
                    }
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' onChange={(e) => setPassword(e.target.value)}/>
                    {errors.password &&
                      <div className='error'>{errors.password}</div>
                    }
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button type='submit' disabled={loading}>
                      {loading ? <Spinner/>: 'Login'}
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
      </Container>
    </Form>
  )
}

export default Login