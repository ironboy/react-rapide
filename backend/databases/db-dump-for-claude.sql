--
-- File generated with SQLiteStudio v3.4.13 on mån juni 16 07:07:57 2025
--
-- Text encoding used: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: acl
CREATE TABLE IF NOT EXISTS acl (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL, userRoles TEXT NOT NULL, method TEXT NOT NULL DEFAULT GET, restApiRoute TEXT NOT NULL, fieldMatchingUserId TEXT, comment TEXT DEFAULT "" NOT NULL, UNIQUE (userRoles, method, restApiRoute));
INSERT INTO acl (id, userRoles, method, restApiRoute, fieldMatchingUserId, comment) VALUES (1, 'visitor', 'POST', '/api/users', NULL, 'Allow registration as new user for visitors');
INSERT INTO acl (id, userRoles, method, restApiRoute, fieldMatchingUserId, comment) VALUES (2, 'visitor, user,admin', '*', '/api/login', NULL, 'Allow access to all login routes for all users');
INSERT INTO acl (id, userRoles, method, restApiRoute, fieldMatchingUserId, comment) VALUES (3, 'admin', '*', '/api/users', NULL, 'Allow admins to see and edit users');
INSERT INTO acl (id, userRoles, method, restApiRoute, fieldMatchingUserId, comment) VALUES (4, 'admin', '*', '/api/acl', NULL, 'Allow admins to see and edit acl rules');
INSERT INTO acl (id, userRoles, method, restApiRoute, fieldMatchingUserId, comment) VALUES (5, 'visitor, user, admin', 'GET', '/api/products', NULL, 'Allow all users to see the product list');
INSERT INTO acl (id, userRoles, method, restApiRoute, fieldMatchingUserId, comment) VALUES (6, 'visitor,user,admin', 'GET', '/api/cart', NULL, 'Allow all users to see their own cart');
INSERT INTO acl (id, userRoles, method, restApiRoute, fieldMatchingUserId, comment) VALUES (7, 'visitor,user,admin', 'DELETE', '/api/cart', NULL, 'Allow all users to empty their own cart');
INSERT INTO acl (id, userRoles, method, restApiRoute, fieldMatchingUserId, comment) VALUES (8, 'visitor,user,admin', 'POST', '/api/change-product-in-cart', NULL, 'Allow all users to change products in their own cart');

-- Table: orderLines
CREATE TABLE IF NOT EXISTS orderLines (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, orderId INTEGER NOT NULL REFERENCES orders (id), productId INTEGER REFERENCES products (id) NOT NULL, quantity INTEGER NOT NULL);

-- Table: orders
CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL, sessionId TEXT NOT NULL UNIQUE, userId INTEGER, created TEXT DEFAULT (CURRENT_TIMESTAMP) NOT NULL, paid TEXT, shipped TEXT);

-- Table: products
CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, name TEXT NOT NULL, description TEXT NOT NULL, quantity TEXT NOT NULL, "price$" NUMERIC NOT NULL, slug TEXT NOT NULL, categories TEXT NOT NULL);
INSERT INTO products (id, name, description, quantity, "price$", slug, categories) VALUES (1, 'Croissant', 'Buttery, flaky French-style croissant baked fresh daily with premium European butter. Perfect for breakfast with jam, afternoon coffee, or as the base for elegant sandwiches.
Golden layers that melt in your mouth with authentic French pastry techniques.', '1 large', 0.99, 'croissant', 'JSON:["Bread & rice"]');
INSERT INTO products (id, name, description, quantity, "price$", slug, categories) VALUES (2, 'Gherkins', 'Crisp, tangy gherkin pickles packed in traditional brine with dill and spices. These small pickles add perfect acidity to sandwiches, charcuterie boards, and salads.
A classic European-style pickle with authentic flavor that brightens any meal.', 'A can of 10', 4.5, 'gherkins', 'JSON:["Vegetables","Canned food"]');
INSERT INTO products (id, name, description, quantity, "price$", slug, categories) VALUES (3, 'Bay Leaves', 'Aromatic dried bay leaves from the Mediterranean, essential for soups, stews, and braised dishes. These whole leaves release their subtle, woodsy flavor slowly during cooking.
Remove before serving for the perfect herbal note in your favorite recipes.', '1 bundle', 3.45, 'bay-leaves', 'JSON:["Vegetables","Spices"]');
INSERT INTO products (id, name, description, quantity, "price$", slug, categories) VALUES (4, 'Tomatoes', 'Fresh, vine-ripened tomatoes bursting with sweet, balanced flavor. Perfect for salads, sandwiches, or cooking.
These tomatoes have been allowed to ripen naturally on the vine for maximum taste and vibrant red color.', '1 lb', 2.5, 'tomatoes-on-the-vine', 'JSON:["Vegetables"]');
INSERT INTO products (id, name, description, quantity, "price$", slug, categories) VALUES (5, 'Basmati Rice', 'Premium long-grain basmati rice with a distinctive nutty aroma and fluffy texture. Aged for optimal flavor, this rice cooks to perfection with separate, non-sticky grains.
Ideal for Indian dishes, pilafs, and everyday meals where quality matters.', '4 lb', 6.99, 'basmati-rice', 'JSON:["Bread & rice"]');
INSERT INTO products (id, name, description, quantity, "price$", slug, categories) VALUES (6, 'Green Olives', 'Plump, buttery green olives cured in traditional Mediterranean style. These olives have a mild, fruity flavor with a satisfying firm texture.
Perfect for antipasto platters, salads, or enjoying straight from the can.', '1 lb, canned', 9.75, 'green-olives', 'JSON:["Canned food"]');
INSERT INTO products (id, name, description, quantity, "price$", slug, categories) VALUES (7, 'Parsley', 'Fresh, vibrant flat-leaf parsley with bright, clean flavor. Essential for Mediterranean cooking, garnishing, and adding fresh herb notes to any dish.
This aromatic herb brightens sauces, soups, and grain dishes beautifully.', '1 bundle', 2.75, 'parsley', 'JSON:["Vegetables","Spices"]');
INSERT INTO products (id, name, description, quantity, "price$", slug, categories) VALUES (8, 'Artichoke', 'Fresh, globe artichoke with tender heart and meaty leaves. Steam, grill, or stuff for an elegant side dish.
This versatile vegetable offers a subtle, nutty flavor and satisfying texture when properly prepared.', '1', 1.75, 'artichoke', 'JSON:["Vegetables"]');
INSERT INTO products (id, name, description, quantity, "price$", slug, categories) VALUES (9, 'Focaccia', 'Rustic Italian focaccia bread with herbs and olive oil, baked to golden perfection. Soft, airy interior with a slightly crispy crust.
Perfect for sandwiches, dipping in olive oil, or serving alongside Mediterranean meals.', '1 large', 4.3, 'focaccia', 'JSON:["Bread & rice"]');
INSERT INTO products (id, name, description, quantity, "price$", slug, categories) VALUES (10, 'Rosemary', 'Fresh rosemary plant in a convenient pot for your kitchen windowsill. This aromatic herb adds pine-like fragrance to roasted meats, potatoes, and bread.
Snip fresh sprigs as needed for cooking or cocktail garnishes.', '1 pot', 3.6, 'rosemary', 'JSON: ["Vegetables","Spices"]');

-- Table: sessions
CREATE TABLE IF NOT EXISTS sessions (
        sid TEXT PRIMARY KEY NOT NULL UNIQUE,
        session TEXT,
        lastupdate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

-- Table: users
CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, email TEXT UNIQUE NOT NULL, firstName TEXT NOT NULL, lastName TEXT NOT NULL, role TEXT NOT NULL DEFAULT user, password TEXT);

-- View: orderRowSums
CREATE VIEW IF NOT EXISTS orderRowSums AS SELECT orders.id, orders.created, 
 products.id AS productId, products.name AS productName,
 orderLines.quantity AS quantity,
 products.price$ AS productPrice$,
 ROUND(products.price$ * orderLines.quantity,2) AS rowSum$,
 orderLines.id AS orderLineId
FROM orders, orderLines, products 
WHERE 
  orderLines.orderId = orders.id 
  AND products.id = orderLines.productId
ORDER BY orders.userId, orders.sessionId, orders.id, orderLines.id;

-- View: orderSummaries
CREATE VIEW IF NOT EXISTS orderSummaries AS SELECT id,created, productId, productName, quantity, productPrice$, rowSum$ FROM
(SELECT * FROM orderRowSums
UNION
SELECT *, null FROM orderTotals)
ORDER BY id, CASE WHEN productPrice$ IS NOT NULL THEN 0 ELSE 1 END, orderLineId;

-- View: orderTotals
CREATE VIEW IF NOT EXISTS orderTotals AS SELECT id, created, null, 'TOTAL', SUM(quantity), null, ROUND(SUM(rowSum$),2) FROM orderRowSums GROUP BY id;

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
