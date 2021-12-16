export const MAINTENANCE_BASE_SAVED = 'MAINTENANCE_BASE_SAVED'
export const MAINTENANCE_CLEARED = 'MAINTENANCE_CLEARED'
export const MAINTENANCE_CREATED = 'MAINTENANCE_CREATED'
export const MAINTENANCE_LISTED = 'MAINTENANCE_LISTED'
export const MAINTENANCE_CLUSTER_LISTED = 'MAINTENANCE_CLUSTER_LISTED'
export const MAINTENANCE_CLUSTER_SELECTED = 'MAINTENANCE_CLUSTER_SELECTED'
export const MAINTENANCE_IRULE_LISTED = 'MAINTENANCE_IRULE_LISTED'
export const MAINTENANCE_IRULE_SELECTED = 'MAINTENANCE_IRULE_SELECTED'
export const MAINTENANCE_VIRTUAL_SERVER_SELECTED = 'MAINTENANCE_VIRTUAL_SERVER_SELECTED'
export const MAINTENANCE_VIRTUAL_SERVERS_LISTED = 'MAINTENANCE_VIRTUAL_SERVERS_LISTED'

export const maintenance = (state = {}, action) => {
  switch (action.type) {
    case MAINTENANCE_CLEARED:
      return {
        ...state,
        maintenance: undefined,
        cluster: undefined,
        iRule: undefined,
        virtualServer: undefined
      }
    case MAINTENANCE_CREATED:
      return {
        ...state,
        maintenance: action.maintenance
      }
    case MAINTENANCE_LISTED:
      return {
        ...state,
        maintenances: action.maintenances
      }
    case MAINTENANCE_BASE_SAVED:
      return {
        ...state,
        base: action.base
      }
    case MAINTENANCE_CLUSTER_SELECTED:
      return {
        ...state,
        cluster: action.cluster
      }
    case MAINTENANCE_CLUSTER_LISTED:
      return {
        ...state,
        clusters: action.clusters
      }
    case MAINTENANCE_IRULE_LISTED:
      return {
        ...state,
        iRules: action.iRules
      }
    case MAINTENANCE_IRULE_SELECTED:
      return {
        ...state,
        iRule: action.iRule
      }
    case MAINTENANCE_VIRTUAL_SERVER_SELECTED:
      return {
        ...state,
        virtualServer: action.virtualServer
      }
    case MAINTENANCE_VIRTUAL_SERVERS_LISTED:
      return {
        ...state,
        virtualServers: action.virtualServers
      }
    default:
      return state;
  }
}