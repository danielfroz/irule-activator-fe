import { useCallback, useEffect } from "react"
import { useAlert } from "react-alert"
import { Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useApi } from "../../hooks"
import Layout from "../../components/Layout"
import * as r from '../../reducers'

const Progress = () => {
  const api = useApi()
  const alert = useAlert()
  const dispatch = useDispatch()
  const maintenance = useSelector(state => state.developer.maintenance)

  const status = useCallback(() => {
    api.post('/developer/status', { key: maintenance.key })
      .then(result => {
        console.log('result: %o', result)
      })
      .catch(e => {
        console.error('error: %o', e.message)
        const { error } = JSON.parse(e.message)
        if(error.code == 'key') {
          // valid key error...
          alert.error('Invalid key or expired; contact Administrators to fix this')
          dispatch({ type: r.DEVELOPER_ERROR, error: error.message })
        }
        alert.error(error)
      })
  }, [ api, maintenance, dispatch ])

  useEffect(() => {
    const interval = setInterval(status, 5 * 1000)
    return () => clearInterval(interval)
  }, [ status ])

  if(!maintenance) {
    return null
  }

  return (
    <Layout>
      <Card>
        <Card.Header>Maintenance In progress</Card.Header>
        <Card.Body>
          Testando
        </Card.Body>
      </Card>
    </Layout>
  )
}

export default Progress