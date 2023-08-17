import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { CredentialModel } from '../models/credential.model';
import { ResponseModel } from '../models/response.model';
import { environment } from 'src/environments/environment';
import { DataModel } from '../models/data.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private _httpClient: HttpClient) {}

  register(credential: CredentialModel): Observable<any> {
    console.log(credential);
    return this._httpClient.post(
      `https://us-central1-courses-auth.cloudfunctions.net/phoneAuth/register`,
      {
        data: credential,
      }
    );
  }
}
