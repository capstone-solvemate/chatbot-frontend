import { beforeAll, describe, expect, it, vi } from "vitest";
import { HttpMethod, KonektorRestApi } from "./KonektorRestApi";
import { mockResponse } from "./stub/fetch/ResponseStub";

function buatKonektorRestApi(): KonektorRestApi {
  return new KonektorRestApi(() => { })
}

function buatEkspektasiUrl(path: string): string {
  const baseUrl = import.meta.env.VITE_SITE_URL
  return `${baseUrl}${path}`
}

const fetchStub = vi.fn().mockResolvedValue(mockResponse())

vi.mock('js-cookie', () => ({
  default: {
    get: vi.fn().mockReturnValue("")
  }
}))

import Cookies from "js-cookie";

describe("KonektorRestApi", () => {
  beforeAll(() => {
    global.fetch = fetchStub
  })

  describe("fungsi get", () => {
    it("harus memanggil fungsi 'fetch' browser dengan http method 'GET'", async () => {
      const restApi = buatKonektorRestApi()
      await restApi.get('/')

      expect(fetchStub).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          method: 'GET'
        })
      )
    })
  })

  describe("fungsi post", () => {
    it("harus memanggil fungsi 'fetch' browser dengan http method 'POST'", async () => {
      const restApi = buatKonektorRestApi()
      await restApi.post('/')

      expect(fetchStub).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          method: 'POST'
        })
      )
    })
  })

  describe("fungsi put", () => {
    it("harus memanggil fungsi 'fetch' browser dengan http method 'PUT'", async () => {
      const restApi = buatKonektorRestApi()
      await restApi.put('/')

      expect(fetchStub).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          method: 'PUT'
        })
      )
    })
  })

  describe("fungsi patch", () => {
    it("harus memanggil fungsi 'fetch' browser dengan http method 'PATCH'", async () => {
      const restApi = buatKonektorRestApi()
      await restApi.patch('/')

      expect(fetchStub).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          method: 'PATCH'
        })
      )
    })
  })

  describe("fungsi delete", () => {
    it("harus memanggil fungsi 'fetch' browser dengan http method 'DELETE'", async () => {
      const restApi = buatKonektorRestApi()
      await restApi.delete('/')

      expect(fetchStub).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          method: 'DELETE'
        })
      )
    })
  })

  describe("fungsi send", () => {
    it("harus membuat URL dari gabungan parameter env 'VITE_SITE_URL' dan 'path'", async () => {
      const path = '/test'
      const ekspektasiUrl = buatEkspektasiUrl(path)

      const restApi = buatKonektorRestApi()
      await restApi.testSend(path, HttpMethod.Get)

      expect(fetchStub).toHaveBeenCalledWith(
        ekspektasiUrl,
        expect.anything()
      )
    })

    it("harus mengirimkan token csrf pada header 'X-Csrf-Token' jika http method 'POST'", async () => {
      const path = '/test'
      const tokenCsrf = 'sampel-token-csrf-123'

      vi.mocked(Cookies.get).mockReturnValue(tokenCsrf as any)

      const restApi = buatKonektorRestApi()
      await restApi.testSend(path, HttpMethod.Post)

      expect(fetchStub).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-Csrf-Token': tokenCsrf
          })
        })
      )
    })

    it("harus mengirimkan token csrf pada header 'X-Csrf-Token' jika http method 'PUT'", async () => {
      const path = '/test'
      const tokenCsrf = 'sampel-token-csrf-123'

      vi.mocked(Cookies.get).mockReturnValue(tokenCsrf as any)

      const restApi = buatKonektorRestApi()
      await restApi.testSend(path, HttpMethod.Put)

      expect(fetchStub).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-Csrf-Token': tokenCsrf
          })
        })
      )
    })

    it("harus mengirimkan token csrf pada header 'X-Csrf-Token' jika http method 'PATCH'", async () => {
      const path = '/test'
      const tokenCsrf = 'sampel-token-csrf-123'

      vi.mocked(Cookies.get).mockReturnValue(tokenCsrf as any)

      const restApi = buatKonektorRestApi()
      await restApi.testSend(path, HttpMethod.Patch)

      expect(fetchStub).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-Csrf-Token': tokenCsrf
          })
        })
      )
    })

    it("harus mengirimkan token csrf pada header 'X-Csrf-Token' jika http method 'DELETE'", async () => {
      const path = '/test'
      const tokenCsrf = 'sampel-token-csrf-123'

      vi.mocked(Cookies.get).mockReturnValue(tokenCsrf as any)

      const restApi = buatKonektorRestApi()
      await restApi.testSend(path, HttpMethod.Delete)

      expect(fetchStub).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-Csrf-Token': tokenCsrf
          })
        })
      )
    })

    it("dilarang mengirimkan header 'X-Csrf-Token' jika token csrf belum ada", async () => {
      const path = '/test-no-csrf-set'

      vi.mocked(Cookies.get).mockReturnValue(undefined as any)

      const restApi = buatKonektorRestApi()
      await restApi.testSend(path, HttpMethod.Delete)

      const relatedCall = fetchStub.mock.calls.find(
        ([url]) => url === buatEkspektasiUrl(path)
      )
      expect(relatedCall).toBeDefined()

      const [, options] = relatedCall!
      if (options.headers) {
        expect(options.headers).not.toHaveProperty('X-Csrf-Token')
      }
    })
  })
})