import { STATUS_FETCHING, STATUS_SUCCESS, STATUS_ERROR } from '../api';

// Return proper action based on api call status
export const actionByStatus = (status, fetchingAction, successAction, errorAction) => {
  switch(status) {
    case STATUS_FETCHING:
      return fetchingAction
    case STATUS_SUCCESS:
      return successAction
    case STATUS_ERROR:
      return errorAction
    default:
      return
  }
}