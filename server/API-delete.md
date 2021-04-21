**DELETE /ads**
----
  Deletes a row from the spreadsheet if ID is found.

* **URL**

  /ads

* **Method:**

  `DELETE`
  
*  **URL Params** <br />
  `/api/ads?id=1`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 204 <br />
    **Content:** 
    Empty
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "ID not found" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/api/ads?id=1",
      dataType: "json",
      type : "DELETE",
    });
  ```
  