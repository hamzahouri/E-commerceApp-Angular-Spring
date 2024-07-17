import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:9090/api/products?size=50' 

  constructor(private http : HttpClient) { }


  getProductList (theCategoryId: number) : Observable <Product[]> {
    return this.http.get<GetResponse> (this.baseUrl).pipe(
      map (res => res._embedded.products)
    )
  }


  
}


interface GetResponse {
  _embedded: {
    products : Product[];
  }
}