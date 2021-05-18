import { parseRequest } from './parser'

export class Context {
  request!: any
  event!: any
  state!: any
  cloned!: boolean
  response!: any
  body!: any
  status!: number
  query!: any

  constructor(event) {
    this.request = parseRequest(event.request)
    this.event = event
    this.state = {}
    this.cloned = false
    this.response = {
      headers: {},
    }
    this.body = ''
    this.status = 404

    // Shortcuts directly on the context
    this.query = this.request.query
  }

  /**
   * Gets a header from the request
   * @param {string} key
   */
  header(key) {
    return this.request.headers[key]
  }

  /**
   * Set a header on the response
   * @param {string} key
   * @param {string} value
   */
  set(key, value) {
    this.response.headers[key] = value
  }

  /**
   * Creates a cloned context
   */
  clone() {
    const clonedContext = new Context(this.event)
    clonedContext.cloned = true

    return clonedContext
  }
}
