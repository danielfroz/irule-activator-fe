import Link from 'next/link'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'

const Home = () => {
  const router = useRouter()
  const token = useSelector(state => state.auth.token)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if(token) {
      setLoading(false)
      return router.push('/main')
    }
    setLoading(false)
  }, [token])

  return (
    <div className={styles.container}>
      <Header/>
      
      {loading &&
        <Container>
          <Spinner animation='border' size='sm'/> Please wait while we're loading the service
        </Container>
      }
      {!loading &&
        <Container>
          <h1>Welcome!</h1>
          <p>
            If you are a developer, click <Link href='/developer'>here</Link>!
          </p>
          <p>
            If you are a administrator, click <Link href='/auth/login'>here</Link>
          </p>
        </Container>
      }
    </div>
  )
}

export default Home