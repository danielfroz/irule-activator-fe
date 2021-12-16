import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import { useApi } from '../../../hooks'
import * as r from '../../../reducers'

const Cluster = () => {
  const api = useApi()
  const dispatch = useDispatch()
  const cluster = useSelector(state => state.maintenance.cluster)

  useEffect(async () => {
    try {
      const result = await api.get('/maintenance/cluster')
      dispatch({ type: r.MAINTENANCE_CLUSTER_LISTED, clusters: result.clusters })
      dispatch({ type: r.MAINTENANCE_CLUSTER_SELECTED, cluster: result.clusters[0] })
    }
    catch(error) {
      alert.error(error)
    }
  }, [ api, dispatch ])

  return (
    <Card border='primary' className='mb-2'>
      <Card.Header>Reference cluster</Card.Header>
      <Card.Body>
        {cluster}
      </Card.Body>
    </Card>
  )
}

export default Cluster