import { useRouter } from 'next/router'
import { Button, ButtonGroup, Card, Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import Activities from './_Activities'

const View = () => {
  const router = useRouter()
  const maintenance = useSelector(state => state.maintenance.maintenance)

  function remove() {
    api.post('/maintenance/delete', { key: maintenance.key })
      .then(() => {
        alert.info('Maintenance removed')
        load()
      })
      .catch(error => {
        alert.error(error)
      })
  }

  if(!maintenance) {
    return (
      <Layout>
        Maintenance not yet selected
      </Layout>
    )
  }

  return (
    <Layout>
      <ButtonGroup className='mb-2 me-2'>
        <Button onClick={() => router.push('/maintenance')}>Back</Button>
      </ButtonGroup>

      <Card border='primary' className='mb-2'>
        <Card.Header>Maintenance</Card.Header>
        <Card.Body>
          <Row>
            <Col>
              {maintenance.name}
            </Col>
            <Col>
              Status:<br/>
              {maintenance.status}
            </Col>
            <Col>
              Key:<br/>
              {maintenance.key}
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Button variant='danger' onClick={remove}>
            Delete
          </Button>
        </Card.Footer>
      </Card>

      <Activities/>
    </Layout>
  )
}

export default View