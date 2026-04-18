export class KonektorBackend {
  constructor() { }

  private baseUrl: string = import.meta.env.VITE_SITE_URL

  /**
   * send post request in unauthorized request
   */
  async postU(endpoint: string, data?: any): Promise<Response> {
    return await this.send(endpoint, HttpMethod.Post, data, true)
  }

  async get(endpoint: string): Promise<Response> {
    return await this.send(endpoint, HttpMethod.Get)
  }

  private async send(endpoint: string, method: HttpMethod, data?: any, unauthenticated: boolean = false, isRetrying: boolean = false): Promise<Response> {
    let url = endpoint
    if (url.startsWith('/')) {
      url = this.baseUrl.replace(/\/$/, '') + endpoint
    }

    let contentType: string | null = null
    let processedData: string = ''

    if (method === HttpMethod.Post || method === HttpMethod.Put) {
      if (typeof data === 'object') {
        contentType = 'application/json; charset=utf-8'
        processedData = JSON.stringify(data)
      }
      else if (typeof data !== 'string') {
        processedData = `${data}`
        contentType = 'text/plain'
      } else {
        processedData = data
        contentType = 'text/plain'
      }
    }

    const fetchFn = async (): Promise<Response> => {
      try {
        let headers: any = {}
        if (contentType) {
          headers = {
            ...headers,
            'Content-Type': contentType
          }
        }

        const response = await fetch(url, {
          method: httpMethodToString(method),
          body: contentType ? processedData : undefined,
          headers: headers
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