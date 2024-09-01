import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  

  private baseUrl = 'http://localhost:9090/api/products?size=50' 
  private categoryUrl ='http://localhost:9090/api/product-category' 

  constructor(private http : HttpClient) { }


  getProductList (theCategoryId: number) : Observable <Product[]> {

    const searchURL = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`

    return this.http.get<GetResponse> (searchURL).pipe(
      map (res => res._embedded.products)
    )
  }



  getProductCategories() : Observable<ProductCategory[]> {
   
    return this.http.get<GetResponseProductCategory> (this.categoryUrl).pipe(
      tap(res => console.log('productCategory:', res._embedded.productCategory)),
      map (res => res._embedded.productCategory   
      ) 
    )
  }


}


interface GetResponse {
  _embedded: {
    products : Product[];
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory : ProductCategory[];
  }
}