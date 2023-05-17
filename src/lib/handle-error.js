export function handleError(error) {
  if (error.response) {
    // client received an oror response (5xx, 4xx)
    console.log(error.response);
  } else if (error.request) {
    // client never received a response, or request never left
    console.log(error.request);
  } else {
    // anything else
    console.log(error);
  }
}
