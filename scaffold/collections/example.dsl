collection(
	name: "customers",
	label: "Young customers",
	id: "youngcustomers",
	weight: 1
) {
	index (
		perpage: 20,
		sortby: "age",
		order: "asc",
		query: {
			age: { $lt: 20 }
		}
	) {
		column(label:"Id", name:"_id")
		column(
			label: "Nome",
			name: "fullname",
			selectable: true,
			sortable: true,
			transformation: function(val) {
				return val+" junior";
			}
		)
		column(name:"email", sortable: true)
		column(name:"city")
		column(name:"age", sortable:true)
		column(label:"N. of orders", name:"orders", sortable:true)
	}
	show {
		// Default
	}
}

collection(
	name: "customers",
	label: "Old customers",
	id: "oldcustomers",
	weight: 2
) {
	index (
		perpage: 20,
		sortby: "age",
		order: "desc",
		query: {
			age: { $gt: 70 }
		}
	) {
		column(label:"Id", name:"_id")
		column(
			label: "Nome",
			name: "fullname",
			selectable: true,
			sortable: true,
			transformation: function(val) {
				return val+" senior";
			}
		)
		column(name:"email", sortable: true)
		column(name:"city")
		column(name:"age", sortable:true)
		column(label:"N. of orders", name:"orders", sortable:true)
	}
	show {
		// Default
	}
}

collection(
	name: "customers",
	label: "All customers",
	id: "all-customers",
	weight: 3
) {
	index {
		index (
		perpage: 20,
		sortby: "fullname"
	) {
		column(label:"Id", name:"_id")
		column(label:"Name", name:"fullname", sortable: false)
		column(name:"email", sortable: true)
		column(name:"city")
		column(name:"age", sortable:true)
		column(label:"N. of orders", name:"orders", sortable:true)
	}
	}
	show {
		// Default
	}
}

collection(
	name:"products",
	label: "All products",
	weight: 5
) {
	index () {
		column(label:"Name", name:"name")
		column(label:"Price", name:"price", transformation: function(val){ return ""+val+" $"; })
		column(label:"Id", name:"_id")
		column(name:"vendor.name", label:"Vendor name", sortable: true)
		column(name:"vendor.email", label:"Vendor email", sortable: true)
		column(name:"vendor.code", label:"Vendor code", sortable: true)
		column(name:"vendor.code.base", label:"Vendor base",  sortable: true)
		column(name:"vendor.code.opt", label:"Vendor opt", sortable: true)
	}
	show {
		// Default
	}
};

collection(
	label: "Orers (no populate)",
	name: "orders",
	id: "orders-no-populate",
	weight: 6
) {
	index {
		column(label:"Id", name:"_id")
		column(label:"Customer", name:"customer")
		column(label:"Product", name:"product")
		column(label:"Quantity", name:"quantity")
	}
	show {
		row(label:"Id", name:"_id")
		row(label:"Customer", name:"customer")
		row(label:"Product", name:"product")
		row(label:"Quantity", name:"quantity")
	}
}

collection(
	label: "Orers (ugly populate)",
	name: "orders",
	id: "orders-ugly-populate",
	weight: 6
) {
	index (populate: [{ path: "customer", model: "customers" }, { path: "product", model: "products" }]) {
		column(label:"Id", name:"_id")
		column(label:"Customer", name:"customer")
		column(label:"Product", name:"product")
		column(label:"Quantity", name:"quantity")
	}
	show (populate: [{ path: "customer", model: "customers" }, { path: "product", model: "products" }]) {
		row(label:"Id", name:"_id")
		row(label:"Customer", name:"customer")
		row(label:"Product", name:"product")
		row(label:"Quantity", name:"quantity")
	}
}

collection(
	label: "Orers (nice populate)",
	name: "orders",
	id: "orders-nice-populate",
	weight: 7
) {
	index (populate: [{ path: "customer", model: "customers" }, { path: "product", model: "products" }]) {
		column(label:"Id", name:"_id")
		column(label:"Customer name", name:"customer.fullname")
		column(label:"Product name", name:"product.name")
		column(label:"Quantity", name:"quantity")
	}
	show (populate: [{ path: "customer", model: "customers" }, { path: "product", model: "products" }]) {
		row(label:"Id", name:"_id")
		row(label:"Customer name", name:"customer.fullname")
		row(label:"Product name", name:"product.name")
		row(label:"Quantity", name:"quantity")
	}
}
