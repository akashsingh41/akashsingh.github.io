import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
export class name
{
  official?: string;
  common?: string; 
}
export class Country {
  
  name?: name;
  
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  endpoint = "https://restcountries.com/v3.1/";
  constructor(private httpClient: HttpClient) { }
  getCountries():Observable<Country[]>
  {
    return this.httpClient
    .get<Country[]>(this.endpoint+'/all')
    .pipe(retry(1), catchError(this.processError));
  }

  processError(err: any)
  {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } 
    else 
    {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(() => {
      message;
    });
  }

  

}
