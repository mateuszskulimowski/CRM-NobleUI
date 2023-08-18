import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private _httpClient: HttpClient) {}

  getMe(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/phoneAuth/me`);
  }
}
