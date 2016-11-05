import {Component, EventEmitter} from 'angular2/core';

import {bootstrap} from 'angular2/platform/browser';

// 132% 92
class Product {
	constructor(
		public sku: string,
		public name: string,
		public imageUrl: string,
		public department: string[],
		public price: number){
	}
}
//Product Image
@Component({
	selector: 'product-image',
	template: `<h1>Product</h1>`
})

class ProductImage {

}

//ProductRow
@Component({
	selector: 'product-row',
	inputs: ['product'],
	host: {'class': 'item'},
	template: `
	<div class="content">
		<div class="header">{{product.name}}</div>
		<div class="meta">
			<div class="product-sku">SKU #{{product.sku}}</div>
			<div class="description">
			</div>
	</div>
	`
})
class ProductRow {
	product: Product;

}

//ProductList
@Component({
	selector: 'products-list',
	directives: [ProductRow],
	inputs: ['productList'],
	outputs: ['onProductSelected'],
	template: `
	<div class="ui items">
		<product-row *ngFor="#myProduct of productList"
			[product]="myProduct">
			(click)="clicked(myProduct)"
			[class.selected]="isSelected(myProduct)"
		</product-row>
	</div>
	`
})
class ProductsList {
	productList: Product[];
	onProductSelected: EventEmitter<Product>;
	currentProduct: Product;

	constructor(){
		this.onProductSelected = new EventEmitter();
	}
	clicked(product: Product): void {
		console.log(product);
		this.currentProduct = product;
		this.onProductSelected.emit(product);
	}
	isSelected(product: Product): boolean {
		if(!product || !this.currentProduct){
			return false;
		}
		return product.sku === this.currentProduct.sku;
	}
}
//InventoryApp
@Component({
	selector: 'inventory-app',
	directives: [ProductsList],
	template: `
	<div class="inventory-app">
		<h1>Inventory App</h1>
		<products-list
			[productList]="products"
			(onProductSelected)="productWasSelected($event)">
		</products-list>
	</div>

	`

})
class InventoryApp {
	products: Product[];

	constructor(){
		this.products = [
		 new Product(
        'MYSHOES', 'Black Running Shoes',
        '/resources/images/products/black-shoes.jpg',
        ['Men', 'Shoes', 'Running Shoes'],
        109.99),
      new Product(
        'NEATOJACKET', 'Blue Jacket',
        '/resources/images/products/blue-jacket.jpg',
        ['Women', 'Apparel', 'Jackets & Vests'],
        238.99),
      new Product(
        'NICEHAT', 'A Nice Black Hat',
        '/resources/images/products/black-hat.jpg',
        ['Men', 'Accessories', 'Hats'],
        29.99)
		];
	}

	productWasSelected(product: Product): void {
		console.log('Product clicked: ', product);
	}

}

bootstrap(InventoryApp);