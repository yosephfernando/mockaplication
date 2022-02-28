# Run API #
- Go into biodata-api folder. `cd biodata-api`
- Install required node modules. `npm install`
- Run the API `npm start`

    *note : Make sure the database connection is right*

    *the api doc : https://documenter.getpostman.com/view/868942/UVkqtFgF#9bcfdf2f-ac96-42c8-b8f4-d2782c36578b*

## Database connection ##
- Go into biodata-api folder. `cd biodata-api`
- Open .env file
- You can edit database connection in .env file
    ```
    MYSQL_HOST = localhost
    MYSQL_USER = root
    MYSQL_PASSWORD = ysp10997
    MYSQL_DATABASE = biodata
    ```
    *note : Make sure to import database from mockdb.sql file*

# Run Frontend #
- Go into biodata-web folder. `cd biodata-web`
- Install required node modules. `npm install`
- Run the frontend `npm start`
- Default admin user : 
    ```
    email : fernandoyoseph6@gmail.com
    password : 12345
    ```

![Sign in](https://raw.githubusercontent.com/yosephfernando/mockaplication/master/screenshots/signin.PNG)
![Sign up](https://raw.githubusercontent.com/yosephfernando/mockaplication/master/screenshots/signup.PNG)
