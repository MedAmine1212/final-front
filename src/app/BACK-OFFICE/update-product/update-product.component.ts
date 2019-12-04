import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Category} from '../../entities/category';
import {Product} from '../../entities/product';
import {ProductService} from '../../services/product/product.service';



@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  @Output() closeAll = new EventEmitter<boolean>();
  @Input() id: number;
  idProduct: number;
  category: Category;
  product: Product;
  categories: Category[];

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) {
  }

  ngOnInit() {

    this.product = new Product();
    this.idProduct = this.id;
    this.productService.getProductById(this.idProduct).subscribe(data => {
      console.log(data);
      this.product = data;
      console.log('category id : ' + data.category.idCategory);
    }, error => console.log(error));
    this.productService.getCategoriesList().subscribe(data => {
      this.categories = data;
    }, error => {
      console.log(error);
    });
  }

  updateProduct() {
    this.productService.updateProduct(this.idProduct, this.product.Productcategory.idCategory, this.product)
      .subscribe(data => console.log(data), error => console.log(error));
    this.product = new Product();
  }


  closeThis() {
    this.updateProduct();
    this.closeAll.emit(true);
  }
}
