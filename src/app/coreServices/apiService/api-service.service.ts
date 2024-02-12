import { ConstantsService } from '../../config/constants/constants.service'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  constructor(
    private _http: HttpClient,
    private _constants: ConstantsService
  ) {}

  endPoint = this._constants.API_ENDPOINT

  // this service can be expanded a lot more to support query params etc
  // but for the needs of this small app it is enough.
  GET(entity: string) {
    return this._http.get(`${this.endPoint}/${entity}`)
  }

  POST(entity: string, data: any) {
    return this._http.post(`${this.endPoint}/${entity}`, data)
  }

  PUT(entity: string, id: any, data: any) {
    return this._http.put(`${this.endPoint}/${entity}/${id}`, data)
  }

  DELETE(entity: string, id: any) {
    return this._http.delete(`${this.endPoint}/${entity}/${id}`)
  }
}
