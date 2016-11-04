import {Component, EventEmitter} from 'angular2/core';

import {bootstrap} from 'angular2/platform/browser';

class Product {
	constructor(
		public sku: string,
		public name: string,
		public imageUrl: string,
		public department: string[],
		public price: number){


	}
}

@Component({
	selector: 'product-image',
	template: `<h1>Product</h1>`
})

class ProductImage {

}

@Component({
	selector: 'inventory-app',
	template: `
	<div>
		<h1>Inventory</h1>
	</div>
	`

})
class InventoryApp {

}

bootstrap(InventoryApp);