**POST /ads, PUT /ad**
----
  Returns json data about all ads filtered by params. 

* **URL**

  /api/ads `POST`
  
  /api/ad `PUT`

* **Method:**

  `POST`, `PUT`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**
    ```javascript
    [
        {
            "id": null,
            "title": "shoes", // required
            "price": 50.00,
            "description": "red jordans", // required
            "photo": "www.photourl.com/1.jpg",
            "condition": "old",
            "email": "email@gmail.com", // required
            "zipCode": "94591" // required
        }
    ]
    ```

* **Success Response:**

    * **Code:** 201 OK <br />
      `POST`, `PUT`
      
      ```javascript
      { "id": "719dc1b5-2c67-4b33-b020-ab7ba71519a6" }
      ```
      

    * **Code:** 204 OK <br /> 
    `PUT`

    
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Input not valid. Please check your request body and try again." }`

* **Sample Call:**

  ```javascript
    var jsonData = [
        {
            "id": null,
            "title": "shoes",
            "price": 50.00,
            "description": "red jordans", 
            "photo": "www.photourl.com/1.jpg",
            "condition": "old",
            "email": "email@gmail.com",
            "zipCode": "94591" 
        }
    ]

    $.ajax({
      url: "/api/ads",
      dataType: "json",
      type : "POST"
      data: jsonData,
      contentType: "application/json"
    });
  ```
