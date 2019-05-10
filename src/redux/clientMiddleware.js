/**
 * @author {[Monty Khanna]}
 */
export default function clientMiddleware(client) {
  return ({ dispatch, getState }) => (next => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ ...rest, type: REQUEST });

    return new Promise((resolve, reject) => {
      promise(client)
        .then((result) => {
          next({ ...rest, result, type: SUCCESS });
          resolve(result);
        })
        .catch((error) => {
          next({ ...rest, error, type: FAILURE });
          reject(error);
        });
    });
  });
}
