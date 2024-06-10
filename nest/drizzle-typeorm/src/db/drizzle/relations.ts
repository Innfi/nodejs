import { relations } from "drizzle-orm/relations";
import { orders, order_details, products, suppliers } from "./schema";

export const order_detailsRelations = relations(order_details, ({one}) => ({
	order: one(orders, {
		fields: [order_details.orderId],
		references: [orders.id]
	}),
	product: one(products, {
		fields: [order_details.productId],
		references: [products.id]
	}),
}));

export const ordersRelations = relations(orders, ({many}) => ({
	order_details: many(order_details),
}));

export const productsRelations = relations(products, ({one, many}) => ({
	order_details: many(order_details),
	supplier: one(suppliers, {
		fields: [products.supplierId],
		references: [suppliers.id]
	}),
}));

export const suppliersRelations = relations(suppliers, ({many}) => ({
	products: many(products),
}));