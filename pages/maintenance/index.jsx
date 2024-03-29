import { useRouter } from "next/router"
import { useEffect, useCallback, useState } from "react"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import { Button, ButtonGroup, Card, Spinner, Table } from "react-bootstrap"
import { useApi } from '../../hooks'
import * as r from '../../reducers'
import Layout from "../../components/Layout"

const List = () => {
  const alert = useAlert()
  const api = useApi()
  const dispatch = useDispatch()
  const router = useRouter()
  const [ loading, setLoading ] = useState(false)
  const maintenances = useSelector(state => state.maintenance.maintenances)

  const load = useCallback(() => {
    setLoading(true)
    api.post('/maintenance/list', {})
      .then(result => {
        console.log('result: %o', result)
        dispatch({ type: r.MAINTENANCE_LISTED, maintenances: result.maintenances })
        setLoading(false)
      })
      .catch(error => {
        console.error('error caught: %o', error)
        alert.error(error)
        setLoading(false)
      })
  }, [ api ])

  useEffect(() => {
    load()
  }, [ load ])

  function select(m) {
    dispatch({ type: r.MAINTENANCE_SELECTED, maintenance: m })
    router.push('/maintenance/view')
  }

  return (
    <Layout>
      <ButtonGroup className='mb-2 me-2'>
        <Button disabled={loading} onClick={() => load()}>
          {loading ? <Spinner animation='border' size='sm'/>: 'Reload'}
        </Button>
      </ButtonGroup>
      <ButtonGroup className='mb-2'>
        <Button onClick={() => router.push('/maintenance/prepare')}>Create</Button>
      </ButtonGroup>
      <Card border='primary'>
        <Card.Header>
          Maintenances in Progress
        </Card.Header>
        <Table hover={true} borderless={false}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Key</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {maintenances && maintenances.map((m, idx) => 
              <tr key={idx} style={{ cursor: 'pointer' }} onClick={() => select(m)}>
                <td>{m.name}</td>
                <td>{m.key}</td>
                <td>{m.status}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Layout>
  )
}

export default List