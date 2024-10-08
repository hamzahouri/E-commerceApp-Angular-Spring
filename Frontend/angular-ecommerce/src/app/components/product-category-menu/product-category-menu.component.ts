import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory [] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProductCategory()
  }
  listProductCategory() {

    this.productService.getProductCategories().subscribe(
      data => {
        console.log('productCategories********'+JSON.stringify(data));
        console.log('productCategories======='+data);
        this.productCategories = data
      }
    );
  }

}
