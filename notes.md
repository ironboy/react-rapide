/api/login GET, POST, DELETE

/api/products GET

/api/orders INGEN DIREKT ACCESS


SPECIAL ROUTE

/create-order/
  SKRIVER MED SESSION_ID + User_id om man är inloggad

POST, PUT, DELETE /orderLines/
 BARA OM VI MATCHAR PÅ user_id eller SESSION-id - typ special-regel för acl...

/orderSummaries GET men bara om vi matchar på user eller session-id







VIKTIGT:
/add-user-to-order   ALTERNATIVT GÖR AUTOMATISKT ID INLOGGNING ALLA ORDRAR SOM MATCHAR!


