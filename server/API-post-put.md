**POST & PUT /ads**
----
  Returns json data about all ads filtered by params. 

* **URL**

  /api/ad

* **Method:**

  `POST`, `PUT`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**
    ```javascript
    [
        {
            "id": 1,
            "title": "shoes", // required
            "price": 50.00,
            "description": "red jordans", // required
            "photo": "www.photourl.com/1.jpg",
            "condition": "old",
            "email": "email@gmail.com",
            "zipCode": "94591" // required
        }
    ]
    ```

* **Success Response:**

    * **Code:** 200 OK <br />
    `POST`, `PUT`

    * **Code:** 204 OK <br /> 
    `PUT`

    
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Input not valid. Please check your request body and try again." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/api/ad",
      dataType: "json",
      type : "POST"
    });
  ```