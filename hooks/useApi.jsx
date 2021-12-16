import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const endpoint = process.env.NEXT_PUBLIC_SERVICE

export const useApi = () => {
  const token = useSelector(state => state.auth && state.auth.token)
  const dispatch = useDispatch()

  const api = useMemo(() => {
    return {
      get: async (url) => {
        // const durl = url != null && url.includes('/auth') ? `${endpoint}${url}`:  `${endpoint}/${url}`
        const r = await request({ url: `${endpoint}${url}`, method: 'GET', token })
        const body = await r.json()
        if(r.status != 200 && r.status != 201) {
          throw new Error(JSON.stringify(body.error))
        }
        return body
      },
      post: async (url, data) => {
        // const durl = url != null && url.includes('/auth') ? `${endpoint}${url}`: `${endpoint}/${url}`
        const r = await request({ url: `${endpoint}${url}`, method: 'POST', token, body: data })
        let body
        const text = await r.text()
        if(text.startsWith('{') || text.startsWith('[')) {
          body = JSON.parse(text)
        }
        if(r.status != 200 && r.status != 201) {
          throw new Error(body ? JSON.stringify(body): text)
        }
        return body
      }
    }
  }, [token])

  return api
}

const request = async ({ url, method, token, body }) => {
  const headers = {
    'Content-Type': 'application/json'
  }
  if(token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return await fetch(url, {
    cache: 'no-cache',
    method,
    headers,
    body: body != null ? JSON.stringify(body): undefined
  })
}