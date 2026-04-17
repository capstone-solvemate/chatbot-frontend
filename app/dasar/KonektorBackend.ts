export class KonektorBackend {
  constructor() { }

  private baseUrl: string = import.meta.env.VITE_BACKEND_BASE_URL

  /**
   * send post request in unauthorized request
   */
  async postU(endpoint: string): Promise<Response> {
    return await this.send(endpoint, HttpMethod.Post, true)
  }

  async get(endpoint: string): Promise<Response> {
    return await this.send(endpoint, HttpMethod.Get)
  }

  private async send(endpoint: string, method: HttpMethod, unauthenticated: boolean = false, isRetrying: boolean = false): Promise<Response> {
    let url = endpoint
    if (url.startsWith('/')) {
      url = this.baseUrl.replace(/\/$/, '') + endpoint
    }
    const fetchFn = async (): Promise<Response> => {
      try {
        const response = await fetch(url, {
          method: httpMethodToString(method)
        })
        if (response.status >= 400) {
          let payload: any = await response.text()
          try {
            payload = JSON.parse(payload)
          } catch (_e: any) { }
          throw new HttpError(response.status, payload)
        }
        return response
      } catch (e: any) {
        if (e instanceof TypeError) {
          throw new FetchError(e.message)
        } else {
          throw e
        }
      }
    }
    return await fetchFn()
  }
}

enum HttpMethod {
  Get,
  Post,
  Put,
  Delete
}

function httpMethodToString(method: HttpMethod): string {
  switch (method) {
    case HttpMethod.Get:
      return 'GET'
    case HttpMethod.Post:
      return 'POST'
    case HttpMethod.Put:
      return 'PUT'
    case HttpMethod.Delete:
      return 'DELETE'
  }
}

export class HttpError extends Error {
  constructor(
    public status: number,
    public payload: any
  ) {
    super(`http error status received with code: ${status}`)
  }
}

export class FetchError extends Error {

}