import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, int, bigint, varchar, foreignKey, date, text, decimal, datetime } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const order_details = mysqlTable("order_details", {
	orderId: int("orderId").notNull().references(() => orders.id),
	productId: int("productId").notNull().references(() => products.id),
	quantity: int("quantity").notNull(),
},
(table) => {
	return {
		order_details_orderId_productId: primaryKey({ columns: [table.orderId, table.productId], name: "order_details_orderId_productId"}),
	}
});

export const orders = mysqlTable("orders", {
	id: int("id").autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	orderDate: date("orderDate", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	shippedDate: date("shippedDate", { mode: 'string' }),
	shipAddress: text("shipAddress").notNull(),
	shipPostalCode: text("shipPostalCode"),
	shipCountry: text("shipCountry").notNull(),
},
(table) => {
	return {
		orders_id: primaryKey({ columns: [table.id], name: "orders_id"}),
	}
});

export const products = mysqlTable("products", {
	id: int("id").autoincrement().notNull(),
	name: text("name").notNull(),
	supplierId: int("supplierId").notNull().references(() => suppliers.id),
	unitPrice: decimal("unitPrice", { precision: 10, scale: 4 }).notNull(),
	unitsInStock: int("unitsInStock").notNull(),
},
(table) => {
	return {
		products_id: primaryKey({ columns: [table.id], name: "products_id"}),
	}
});

export const suppliers = mysqlTable("suppliers", {
	id: int("id").autoincrement().notNull(),
	companyName: text("companyName").notNull(),
	city: text("city"),
	country: text("country").notNull(),
},
(table) => {
	return {
		suppliers_id: primaryKey({ columns: [table.id], name: "suppliers_id"}),
	}
});

export const users = mysqlTable("users", {
	id: bigint("id", { mode: "number" }).autoincrement().notNull(),
	email: varchar("email", { length: 200 }),
	pass: varchar("pass", { length: 45 }),
	created_at: datetime("created_at", { mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`),
},
(table) => {
	return {
		users_id: primaryKey({ columns: [table.id], name: "users_id"}),
	}
});