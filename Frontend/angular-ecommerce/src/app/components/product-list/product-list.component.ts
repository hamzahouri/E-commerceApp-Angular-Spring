import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;

  constructor(private productSerevice: ProductService,
              private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( () => {
      this.listProducts();
    } )
     
  }

  listProducts () {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode) {
      this.handleSearchProduct();
    }
    else {
      this.handleListProduct();  
    }   
  }

  handleSearchProduct() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    this.productSerevice.searchMethod(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handleListProduct () {

    // the snapshot mean the state of route at this time
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }

    this.productSerevice.getProductList(this.currentCategoryId).subscribe(
      data => { this.products = data}
    )
  }

}
