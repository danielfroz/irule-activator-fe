export const DEVELOPER_ERROR = 'DEVELOPER_ERROR'
export const DEVELOPER_STARTED = 'DEVELOPER_STARTED'
export const DEVELOPER_STOPPED = 'DEVELOPER_STOPPED'

export const developer = (state = {}, action) => {
  switch (action.type) {
    case DEVELOPER_ERROR:
      return {
        ...state,
        error: action.error,
        maintenance: undefined
      }
    case DEVELOPER_STARTED:
      return {
        ...state,
        key: action.maintenance.key,
        maintenance: action.maintenance
      }
    case DEVELOPER_STOPPED:
      return {
        ...state,
        maintenance: undefined
      }
    default:
      return state;
  }
}