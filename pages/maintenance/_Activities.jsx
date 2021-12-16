import { useSelector } from 'react-redux'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { useEffect, useState } from 'react'

const Activities = () => {
  const maintenance = useSelector(state => state.maintenance.maintenance)
  const [ activities, setActivities ] = useState([])

  useEffect(() => {
    if(maintenance && maintenance.activities)
      setActivities(maintenance.activities)
  }, [ maintenance ])

  // do not show anything if there is no maintenance
  if(activities.length == 0)
    return null

  return (
    <ListGroup className='mb-2'>
      {activities && activities.map((a, idx) => <Item key={idx} activity={a}/>)}
    </ListGroup>
  )
}

export default Activities

const Item = ({ activity }) => {
  const [ open, setOpen ] = useState(false)

  function toggle() {
    setOpen(o => !!!o)
  }

  if(!open) {
    return (
      <ListGroupItem action={true} onClick={() => toggle()}>
        {activity.message}
        {activity.error && <div className='error'>{activity.error}</div>}
      </ListGroupItem>
    )
  }
  else {
    return (
      <ListGroupItem action={true} onClick={() => toggle()}>
        <small>Date: {activity.date}</small><br/>
        <small>Owner: {activity.owner}</small><br/>
        {activity.message}
        {activity.error && <div className='error'>{activity.error}</div>}
      </ListGroupItem>
    )
  }
}