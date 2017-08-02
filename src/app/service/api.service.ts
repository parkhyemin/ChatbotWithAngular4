import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ApiService {

  private headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  private API_URL: string = '';

  constructor(private http: Http) {

  }

  /*
  constructor(private jsonp: Jsonp, @Inject(APP_CONFIG) config: AppConfig) {
    this.API_URL = config.aiBotApiUrl;
  }
  */
  
  public get(path: string, term?: any): Observable<any> {
    let params = new URLSearchParams();

    if (term) {
      Object.keys(term).forEach(key => params.set(key, term[key]));
    }

    return this.http.get(`${this.API_URL}${path}`, { params, headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  public post(path: string, data: any): Observable<any> {
    this.setHeader("Content-Type", "application/json");
    let body = JSON.stringify(data);
    console.log(`${this.API_URL}${path}`);
    return this.http.post(`${this.API_URL}${path}`, body, { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  public postFormData(path: string, body: string): Observable<any> {
    this.setHeader("Content-Type", "application/x-www-form-urlencoded");
    return this.http.post(`${this.API_URL}${path}`, body, { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  public put(path: string, data: any): Observable<any> {
    let body = JSON.stringify(data);

    return this.http.put(`${this.API_URL}${path}`, body, { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  public delete(path: string): Observable<any> {
    return this.http.delete(`${this.API_URL}${path}`, { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  public setHeaders(headers) {
    Object.keys(headers).forEach(header => this.headers.set(header, headers[header]));
  }

  public setHeader(key: string, value: string) {
    this.headers.set(key, value);
  }

  public setApiUrl(url: string) {
    this.API_URL = url;
  }

  private extractData(res: Response): Array<any> | any {
    if (res.status >= 200 && res.status <= 300) {
        // console.log("resource => " + res.text);
      return res.json() || {};
    }

    return res;
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    // let errMsg = (error.message) ? error.message :
    //   error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    // console.error(errMsg); // log to console instead
    console.log(error);
    return Observable.throw(error);
  }

}
