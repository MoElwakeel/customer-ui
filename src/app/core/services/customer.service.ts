import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';


import { HttpClientService } from './http-client.service';
import { map } from "rxjs/operators";


const url =  'Customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpService: HttpClientService) { }
 

  SaveCustomer(
    
    customerModel: Customer
  ): Observable<any> {
    return this.httpService.post(
      `${url}/Add`,
      customerModel
    );
  }

   getCustomers(): Observable<any> {
    return this.httpService.get(`${url}/GetAll`);
  }
  DeleteCustomer(
    
    id: number
  ): Observable<any> {
    
    return this.httpService.delete(
      `${url}/Delete/${id}`
    );
  }
  
 

  
}
