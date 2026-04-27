import Cookies from 'js-cookie'

export class KonektorBackend {
  constructor(private setDevMode: () => void) { }

  private baseUrl: string = import.meta.env.VITE_SITE_URL

  /**
   * send post request in unauthorized request
   */
  async post(endpoint: string, data?: any): Promise<Response> {
    return await this.send(endpoint, HttpMethod.Post, data)
  }

  async put(endpoint: string, data?: any): Promise<Response> {
    return await this.send(endpoint, HttpMethod.Put, data)
  }

  async get(endpoint: string): Promise<Response> {
    return await this.send(endpoint, HttpMethod.Get)
  }

  async delete(endpoint: string): Promise<Response> {
    return await this.send(endpoint, HttpMethod.Delete)
  }

  private async send(endpoint: string, method: HttpMethod, data?: any, isRetrying: boolean = false): Promise<Response> {
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
      } else if (data === null || data === undefined) {
        contentType = null
      } else {
        processedData = data
        contentType = 'text/plain'
      }
    }

    const fetchFn = async (): Promise<Response> => {
      try {
        let headers: any = {}
        if (method !== HttpMethod.Get) {
          headers['X-CSRF-TOKEN'] = Cookies.get('csrf_token')
        }
        if (contentType) {
          headers['Content-Type'] = contentType
        }

        let response = await fetch(url, {
          method: httpMethodToString(method),
          body: contentType ? processedData : undefined,
          headers: headers
        })
        if (response.headers.get('X-Dev-Env-Alert') === '1') {
          this.setDevMode()
        }
        if (response.status >= 400) {
          if (response.status === 419 && !isRetrying) {
            response = await this.send(endpoint, method, data, true)
          } else if (response.status === 502) {
            throw new FetchError('bad gateway')
          } else {
            let payload: any = await response.text()
            try {
              payload = JSON.parse(payload)
            } catch (_e: any) { }
            throw new HttpError(response.status, payload)
          }
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