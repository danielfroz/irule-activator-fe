import { useRouter } from "next/router"
import { Fragment, useEffect, useState } from "react"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import { Alert, Button, Card, ListGroup, ListGroupItem, Spinner } from "react-bootstrap"
import { useApi } from '../../hooks'
import * as r from '../../reducers'
import Layout from "../../components/Layout"
import Activities from './_Activities'

const Verify = () => {
  const alert = useAlert()
  const api = useApi()
  const dispatch = useDispatch()
  const router = useRouter()
  const [ loading, setLoading ] = useState(false)
  const [ intervalHandler, setIntervalHandler ] = useState(undefined)
  const maintenance = useSelector(state => state.maintenance.maintenance)

  useEffect(async () => {
    if(!maintenance) {
      // alert.error('no maintenance created; please go back and try again!')
      return
    }
    setLoading(true)
    const handler = setInterval(verify, 2 * 1000)
    setIntervalHandler(handler)
    return () => handler != null && clearInterval(handler)
  }, [ maintenance && maintenance.key ])

  useEffect(() => {
    if(!maintenance)
      return;
    if(!intervalHandler)
      return
    
    // check for status; we may have already the resolution...
    if(maintenance.status == 'Verified' || maintenance.status == 'VerificationFailed') {
      setLoading(false)
      clearInterval(intervalHandler)
      setIntervalHandler(undefined)
    }
  }, [ maintenance, intervalHandler ])

  // triggers new verification
  function trigger() {
    api.post('/maintenance/verify', { key: maintenance.key })
      .then(() => {
        dispatch({ type: r.MAINTENANCE_CREATED, maintenance: { ...maintenance, status: 'Created' } })
      })
      .catch(error => {
        alert.error(error)
      })
  }

  function verify() {
    if(!maintenance) {
      // nothing to be done yet... we must have maintenance created...
      alert.error('no maintenance yet available!!! return and try again!')
      return
    }
    api.post('/maintenance/get', { key: maintenance.key })
      .then(result => {
        dispatch({ type: r.MAINTENANCE_UPDATED, maintenance: result.maintenance })
      })
      .catch(error => {
        setLoading(false)
        alert.error(error)
      })
  }

  return (
    <Layout>
      <Card border='primary' className='mb-2'>
        <Card.Header>Verification</Card.Header>
        {loading &&
          <Card.Body>
            <Spinner animation='border' size='sm'/>{' '}
            Performing sanity check... Grab a {'\u2615'} or maybe 2 ...
          </Card.Body>
        }
        {!loading && maintenance && maintenance.status === 'Verified' &&
          <Fragment>
            <Card.Body>
              <p>All good! You are ready to rock!</p>
              <p>You can share the key with your Dev team: {maintenance.key}</p>
            </Card.Body>
            <Card.Footer>
              <Button onClick={() => router.push('/maintenance')}>Continue</Button>
            </Card.Footer>
          </Fragment>
        }
        {!loading && maintenance && maintenance.status === 'VerificationFailed' &&
          <Fragment>
            <Card.Body>
              <Alert variant='danger'>
                Hmmm... seems that something is not quite right; check the tests and correct any problem reported...
                If you're feeling comfortable with the changes... try to Verify the service again...
              </Alert>
              Maintenance: {maintenance.status}
            </Card.Body>
            <Card.Footer>
              <Button onClick={() => trigger()}>Verify Again</Button>
            </Card.Footer>
          </Fragment>
        }
      </Card>

      <Activities/>
    </Layout>
  )
}

export default Verify