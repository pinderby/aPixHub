
// Define api root address
export const API_ROOT = 'https://apix.rocks/'
export const FETCHING = 'fetching'
export const SUCCESS = 'success'
export const ERROR = 'error'

/////////////////// TODO --DM-- Implement Normalizr //////////////////

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/paularmstrong/normalizr

/////////////////// TODO --DM-- Implement Normalizr ///////////////////

// Performs the call and promises when such actions are dispatched.
const callApi = (dispatchActionWithStatus, apiArgs) => {
  // apiArgs must include: { endpoint, method, payload }

  // TODO --DM-- Error handling of api request
  checkApiArgs(apiArgs)

  // Dispatch fetching action
  dispatchActionWithStatus({ status: FETCHING })

  // Return api call to get search results
  fetch(`${API_ROOT}/${apiArgs.endpoint}`, {
    headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    method: apiArgs.method,
    body: apiArgs.payload
  })
  .then(function(response){ 
    dispatchActionWithStatus({ status: SUCCESS, response: response })
  })
  .catch(function(error) {
    dispatchActionWithStatus({ status: ERROR, error: error })
  });
}

checkApiArgs(apiArgs) {
  // TODO --DM-- add additional checking
  if (apiArgs.hasOwnProperty('type')) {
    throw new Error('API Arguments must contain an action type.')
  }
  if (apiArgs.hasOwnProperty('endpoint')) {
    throw new Error('API Arguments must contain an API endpoint.')
  }
  if (apiArgs.hasOwnProperty('method')) {
    throw new Error('API Arguments must contain an HTTP request method.')
  }
  if (apiArgs.hasOwnProperty('payload')) {
    throw new Error('API Arguments must contain a payload.' +
    ' Pass an empty object if the request does not require a payload.')
  }
  if (typeof apiArgs.endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
}
