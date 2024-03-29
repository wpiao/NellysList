**GET /ads**
----
  Returns json data about all ads filtered by params. 

* **URL**

  /ads

* **Method:**

  `GET`
  
*  **URL Params** <br />
  `/api/ads?id=1`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```javascript
    [
      {
        "id": 1,
        "title": "shoes",
        "price": 50.00,
        "description": "red jordans",
        "photo": "www.photourl.com/1.jpg",
        "condition": "old",
        "email": "email@gmail.com",
        "zipCode": "94591",
        "createdDate": "2020-04-06 15:30:10", // YYYY-MM-DD HH:MM:SS
        "modifiedDate": "2020-04-16 15:30:10", // DateTimes in UTC
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/api/ads",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
  