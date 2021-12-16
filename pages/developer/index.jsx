import { useSelector } from 'react-redux'
import Start from './_start'
import Progress from './_progress'

const Main = () => {
  const maintenance = useSelector(state => state.developer.maintenance)

  if(!maintenance)
    return (
      <Start/>
    )
  else
    return (
      <Progress/>
    )
}

export default Main