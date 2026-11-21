const DESTINATION = 'https://hackinfrafuturo.cl/'

export default {
  fetch(): Response {
    return Response.redirect(DESTINATION, 301)
  },
}
