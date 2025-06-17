--
-- File generated with SQLiteStudio v3.4.13 on tis juni 17 02:37:24 2025
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
INSERT INTO products (id, name, description, quantity, "price$", slug, categories) VALUES (1, '{"en":"Croissant","sv":"Croissant","no":"Croissant"}', '{"en":"Buttery, flaky French-style croissant baked fresh daily with premium European butter. Perfect for breakfast with jam, afternoon coffee, or as the base for elegant sandwiches.\nGolden layers that melt in your mouth with authentic French pastry techniques.","sv":"Smörig, flagnig fransk croissant bakad färsk dagligen med premium europeiskt smör. Perfekt till frukost med sylt, eftermiddagskaffe, eller som bas för eleganta smörgåsar.\nGyllene lager som smälter i munnen med autentisk fransk bakverk-teknik.","no":"Smørig, flaky fransk croissant bakt fersk daglig med premium europeisk smør. Perfekt til frokost med syltetøy, ettermiddagskaffe, eller som base for elegante smørbrød.\nGylne lag som smelter i munnen med autentisk fransk bakverksteknikk."}', '1 large', 0.99, 'croissant', 'JSON:["Bread & rice"]');
INSERT INTO products (id, name, description, quantity, "price$", slug, categories) VALUES (2, '{"en":"Gherkins","sv":"Inlagda gurkor","no":"Sylteagurker"}', '{"en":"Crisp, tangy gherkin pickles packed in traditional brine with dill and spices. These small pickles add perfect acidity to sandwiches, charcuterie boards, and salads.\nA classic European-style pickle with authentic flavor that brightens any meal.","sv":"Krispiga, syrliga inlagda smågurkorna packade i traditionell saltlake med dill och kryddor. Dessa små inläggningar ger perfekt syra till smörgåsar, charkuteribrädor och sallader.\nEn klassisk europeisk inläggning med autentisk smak som lyser upp alla måltider.","no":"Sprø, syrlige sylteagurker pakket i tradisjonell saltlake med dill og krydder. Disse små agurkene gir perfekt syre til smørbrød, charcuteribrett og salater.\nEn klassisk europeisk sylteagurk med autentisk smak som lyser opp alle måltider."}', 'A can of 10', 4.5, 'gherkins', 'JSON:["Vegetables","Canned food"]');
INSERT INTO products (id, name, description, quantity, "price$", slug, categories) VALUES (3, '{"en":"Bay Leaves","sv":"Lagerblad","no":"Laurbærblad"}', '{"en":"Aromatic dried bay leaves from the Mediterranean, essential for soups, stews, and braised dishes. These whole leaves release their subtle, woodsy flavor slowly during cooking.\nRemove before serving for the perfect herbal note in your favorite recipes.","sv":"Aromatiska torkade lagerblad från Medelhavet, essentiella för soppor, gryttor och braised rätter. Dessa hela blad släpper sin subtila, vedartade smak långsamt under tillagning.\nTa bort före servering för den perfekta örtnotan i dina favoritrecept.","no":"Aromatiske tørkede laurbærblad fra Middelhavet, essensielle for supper, gryter og braised retter. Disse hele bladene slipper sin subtile, vedaktige smak sakte under tilberedning.\nFjern før servering for den perfekte urtenoten i dine favorittoppskrifter."}', '1 bundle', 3.45, 'bay-leaves', 'JSON:["Vegetables","Spices"]');
INSERT INTO products (id, name, description, quantity, "price$", slug, categories) VALUES (4, '{"en":"Tomatoes","sv":"Tomater","no":"Tomater"}', '{"en":"Fresh, vine-ripened tomatoes bursting with sweet, balanced flavor. Perfect for salads, sandwiches, or cooking.\nThese tomatoes have been allowed to ripen naturally on the vine for maximum taste and vibrant red color.","sv":"Färska, vinmogna tomater sprudlande av söt, balanserad smak. Perfekta för sallader, smörgåsar eller matlagning.\nDessa tomater har fått mogna naturligt på rankan för maximal smak och livlig röd färg.","no":"Ferske, vinmodne tomater sprudlende av søt, balansert smak. Perfekte for salater, smørbrød eller matlaging.\nDisse tomatene har fått modne naturlig på ranken for maksimal smak og livlig rød farge."}', '1 lb', 2.5, 'tomatoes-on-the-vine', 'JSON:["Vegetables"]');
INSERT INTO products (id, name, description, quantity, "price$", slug, categories) VALUES (5, '{"en":"Basmati Rice","sv":"Basmatiris","no":"Basmatirìs"}', '{"en":"Premium long-grain basmati rice with a distinctive nutty aroma and fluffy texture. Aged for optimal flavor, this rice cooks to perfection with separate, non-sticky grains.\nIdeal for Indian dishes, pilafs, and everyday meals where quality matters.","sv":"Premium långkornigt basmatiris med distinkt nötig arom och fluffig textur. Lagrat för optimal smak, detta ris kokas till perfektion med separata, icke-klibbiga korn.\nIdealiskt för indiska rätter, pilafs och vardagsmåltider där kvalitet spelar roll.","no":"Premium langkornet basmatirìs med distinkt nøttig aroma og luftig tekstur. Lagret for optimal smak, denne risen kokes til perfeksjon med separate, ikke-klebrige korn.\nIdeell for indiske retter, pilafer og hverdagsmåltider der kvalitet betyr noe."}', '4 lb', 6.99, 'basmati-rice', 'JSON:["Bread & rice"]');
INSERT INTO products (id, name, description, quantity, "price$", slug, categories) VALUES (6, '{"en":"Green Olives","sv":"Gröna oliver","no":"Grønne oliven"}', '{"en":"Plump, buttery green olives cured in traditional Mediterranean style. These olives have a mild, fruity flavor with a satisfying firm texture.\nPerfect for antipasto platters, salads, or enjoying straight from the can.","sv":"Fylliga, smöriga gröna oliver konserverade i traditionell medelhavsstil. Dessa oliver har en mild, fruktig smak med tillfredsställande fast textur.\nPerfekta för antipasträdor, sallader eller att njuta direkt från burken.","no":"Fyllige, smørige grønne oliven konservert i tradisjonell middelhavsstil. Disse olivenene har en mild, fruktig smak med tilfredsstillende fast tekstur.\nPerfekte for antipastofat, salater eller å nyte direkte fra boksen."}', '1 lb, canned', 9.75, 'green-olives', 'JSON:["Canned food"]');
INSERT INTO products (id, name, description, quantity, "price$", slug, categories) VALUES (7, '{"en":"Parsley","sv":"Persilja","no":"Persille"}', '{"en":"Fresh, vibrant flat-leaf parsley with bright, clean flavor. Essential for Mediterranean cooking, garnishing, and adding fresh herb notes to any dish.\nThis aromatic herb brightens sauces, soups, and grain dishes beautifully.","sv":"Färsk, livlig plattpersilja med klar, ren smak. Essentiell för medelhavsmatlagning, garnering och för att tillföra färska örtnoter till alla rätter.\nDenna aromatiska ört lyser upp såser, soppor och kornrätter vackert.","no":"Fersk, livlig flatpersille med klar, ren smak. Essensiell for middelhavsmatlaging, garnering og for å tilføre ferske urtenoter til alle retter.\nDenne aromatiske urten lyser opp sauser, supper og kornretter vakkert."}', '1 bundle', 2.75, 'parsley', 'JSON:["Vegetables","Spices"]');
INSERT INTO products (id, name, description, quantity, "price$", slug, categories) VALUES (8, '{"en":"Artichoke","sv":"Kronärtskocka","no":"Artisjokk"}', '{"en":"Fresh, globe artichoke with tender heart and meaty leaves. Steam, grill, or stuff for an elegant side dish.\nThis versatile vegetable offers a subtle, nutty flavor and satisfying texture when properly prepared.","sv":"Färsk jordklotskronärtskocka med ömt hjärta och köttig blad. Ånga, grilla eller fyll för en elegant tillbehör.\nDenna mångsidiga grönsak erbjuder en subtil, nötig smak och tillfredsställande textur när den tillagas rätt.","no":"Fersk globeartisjokk med ømme hjerte og kjøttige blad. Damp, grill eller fyll for en elegant tilbehør.\nDenne alsidige grønnsaken tilbyr en subtil, nøttig smak og tilfredsstillende tekstur når den tilberedes riktig."}', '1', 1.75, 'artichoke', 'JSON:["Vegetables"]');
INSERT INTO products (id, name, description, quantity, "price$", slug, categories) VALUES (9, '{"en":"Focaccia","sv":"Focaccia","no":"Focaccia"}', '{"en":"Rustic Italian focaccia bread with herbs and olive oil, baked to golden perfection. Soft, airy interior with a slightly crispy crust.\nPerfect for sandwiches, dipping in olive oil, or serving alongside Mediterranean meals.","sv":"Rustikt italienskt focacciabröd med örter och olivolja, bakat till gyllene perfektion. Mjuk, luftig insida med något krispig skorpa.\nPerfekt för smörgåsar, att doppa i olivolja, eller att servera tillsammans med medelhavsmåltider.","no":"Rustikk italiensk focacciabrød med urter og olivenolje, bakt til gyllen perfeksjon. Myk, luftig innside med noe sprø skorpe.\nPerfekt for smørbrød, å dyppe i olivenolje, eller å servere sammen med middelhavsmåltider."}', '1 large', 4.3, 'focaccia', 'JSON:["Bread & rice"]');
INSERT INTO products (id, name, description, quantity, "price$", slug, categories) VALUES (10, '{"en":"Rosemary","sv":"Rosmarin","no":"Rosmarin"}', '{"en":"Fresh rosemary plant in a convenient pot for your kitchen windowsill. This aromatic herb adds pine-like fragrance to roasted meats, potatoes, and bread.\nSnip fresh sprigs as needed for cooking or cocktail garnishes.","sv":"Färsk rosmarinplanta i bekväm kruka för ditt köksfönster. Denna aromatiska ört tillför tallliknande doft till rostade kött, potatis och bröd.\nKlipp färska kvistar efter behov för matlagning eller cocktailgarnering.","no":"Fersk rosmarinplante i praktisk krukke for ditt kjøkkenvindu. Denne aromatiske urten tilfører furuliknende duft til stekt kjøtt, poteter og brød.\nKlipp ferske kvister etter behov for matlaging eller cocktailgarnering."}', '1 pot', 3.6, 'rosemary', 'JSON: ["Vegetables","Spices"]');

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
