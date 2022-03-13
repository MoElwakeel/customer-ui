import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { HeaderOptions } from "../models/common.model";

@Injectable({
  providedIn: "root",
})
export class HttpClientService {
  private readonly apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }
 private setHeaders(): Headers {

    let headersConfig =
    {
      'Content-Type': 'application/json',
    };
    return new Headers(headersConfig);
  }

  // Method that creates the header options for post requests
  private createPostAndPutHeaderOptions(
    contentType: string
    ,
    headerOptions: HeaderOptions[] = []
    //headerOptions: any
  ): any {
    const requestHeaders = new HttpHeaders();
    if (contentType !== null) {
      requestHeaders.set("Content-Type", contentType);
    }

    requestHeaders.set("Access-Control-Allow-Origin", "*");
    if (headerOptions !== null) {
      headerOptions.map((h) => {
        requestHeaders.set(h.name, h.value);
      });
    }
    return { headers: requestHeaders };
  }

  // Base get method
  public get(url: string): Observable<any> {
    const requestUrl = `${this.apiUrl}/${url}`;
    return this.httpClient.get(requestUrl);
  }

  public getWithParams(url: string, params: any): Observable<any> {
    const requestUrl = `${this.apiUrl}/${url}`;
    return this.httpClient.get(requestUrl, params);
  }

  // Base post method
  public post(
    url: string,
    data: any,
    contentType: string = "application/json",
   // headerOptions: HeaderOptions[] = null
  ): Observable<any> {
    const requestUrl = `${this.apiUrl}/${url}`;
    const options = this.createPostAndPutHeaderOptions(
      contentType,
     // headerOptions,
      
    );
    return this.httpClient.post(requestUrl, data, options);
  }

  // Base put method
  public put(
    url: string,
    data: any,
    contentType: string = "application/json"
  ): Observable<any> {
    const requestUrl = `${this.apiUrl}/${url}`;
    const options = this.createPostAndPutHeaderOptions(contentType);
    return this.httpClient.put(requestUrl, data, options);
  }

  public delete(
    url: string,
   
    //contentType: string = "application/json"
  ): Observable<any> {
    const requestUrl = `${this.apiUrl}/${url}`;
    //const options = this.createPostAndPutHeaderOptions(contentType);
    return this.httpClient.delete(requestUrl);
  }

  
}
