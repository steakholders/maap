collection(
	name: "customers",
	id: "default-customers",
	label: "Customers (default)",
	weight: 10
) {
}

collection(
	name: "orders",
	id: "default-orders",
	label: "Orders (default)",
	weight: 11
) {
	index {
	}
	show {	
	}
}

collection(
	name: "products",
	id: "default-products",
	label: "Products (default)",
	weight: 12
) {
}

collection(
	name:"unexistent",
	id: "id13",
	weight: 13
) {
	index {
		column(label: "Id", name: "_id")
	}
	show {
	}
}

collection(
	name: "customers",
	label: "Customers bis",
	id: "customers-bis",
	weight: 14
) {
}

collection(
	name: "orders",
	label: "Orders bis",
	id: "orders-bis",
	weight: 15
) {
}

collection(
	name: "products",
	label: "Products bis",
	id: "products-bis",
	weight: 16
) {
}

collection(
	name: "unexistent",
	id: "radom-id",
	weight: 17
) {
}

collection(
	name: "unexistent",
	id: "another-id",
	weight: 18
) {
}
