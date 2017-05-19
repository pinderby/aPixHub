// Define api root address
export const API_ROOT = 'https://apix.rocks'
export const STATUS_FETCHING = 'fetching'
export const STATUS_SUCCESS = 'success'
export const STATUS_ERROR = 'error'

// Base curried function to create dispatchActionWithStatus function for callApi()
export const dispatchActionWithArgs = (dispatch) => (actionCreator) => (...args) => (status) => dispatch(actionCreator(status, args));

/////////////////// TODO --DM-- Implement Normalizr //////////////////

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/paularmstrong/normalizr

/////////////////// TODO --DM-- Implement Normalizr ///////////////////

// Performs the call and promises when such actions are dispatched.
export const callApi = (dispatchActionWithStatus, apiArgs) => {
  // apiArgs must include: { endpoint, method, payload }

  // TODO --DM-- Error handling of api request
  checkApiArgs(apiArgs)

  // Dispatch fetching action
  dispatchActionWithStatus({ status: STATUS_FETCHING })

  // Return api call to get search results
  fetch(`${API_ROOT}${apiArgs.endpoint}`, {
    headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    method: apiArgs.method,
    body: apiArgs.payload
  })
  .then(function(response){ 
    // Log response from server
    console.log('callApi() response: ', response); // TODO --DM-- Remove
    return response.json();
  })
  .then(function(data){ 
    console.log('callApi() success data: ', data); // TODO --DM-- Remove

    // Receive data from server when request is completed and dispatch success action
    dispatchActionWithStatus({ status: STATUS_SUCCESS, response: data })
  })
  .catch(function(error) {
    // Log error from server
    console.log('callApi() error: ', error); // TODO --DM-- Remove

    // Receive error from server when request is completed and dispatch error action
    dispatchActionWithStatus({ status: STATUS_ERROR, error: error })
  });
}

function checkApiArgs(apiArgs) {
  // TODO --DM-- add additional checking
  if (!apiArgs.hasOwnProperty('endpoint')) {
    throw new Error('API Arguments must contain an API endpoint.')
  }
  if (!apiArgs.hasOwnProperty('method')) {
    throw new Error('API Arguments must contain an HTTP request method.')
  }
  if (!apiArgs.hasOwnProperty('payload')) {
    throw new Error('API Arguments must contain a payload.' +
    ' Pass an empty object if the request does not require a payload.')
  }
  if (typeof apiArgs.endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
}
