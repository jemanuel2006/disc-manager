# Disc Manager

This is a simple Disc Manager made with React and Node/Express to manage CRUD operations with Discs.
Supported HTTP Verbs by Backend API: POST, PUT, GET.

# API Routes

| Route | Verb | Description | Possible Query/Body Parameters |
| ------------- | ------------- | ------------- | ------------- |
| '/disccollections'  | GET  | Get the list of all disc collections.  | -- |
| '/disccollections'  | POST  | Add a new collection to Database. Body should contain a JSON with properties.  | Body: name, discsIds |
| '/disccollections/:id'  | GET  | Get specific collection by its id.  | -- |
| '/disccollections/:id'  | PUT  | Update specific collection by its id. Body should contain a JSON with properties  | Body: name, discsIds |
| '/discs'  | GET  | Get the list of all discs.  | -- |
| '/discs'  | POST  | Add a new disc to Database. Body should contain a JSON with properties.  | Body: name, year |
| '/discs/:id'  | GET  | Get specific disc by its id.  | -- |
| '/discs/:id'  | PUT  | Update specific disc by its id. Body should contain a JSON with properties  | Body: name, year |

### Prerequisites

To get Disc Manager running, you should have installed Node.js and MySQL.

### Installing

With the prerequisites satisfied, run these commands in the following order:

```
npm run installall
npm run dev
```

The script "dev" will automatically run both Web Application (React) and Web API (Express) together. You can run separately with the following commands:

```
npm run client
npm run server
```

Also, run the "Tables.sql" script to create database tables in MySQL server.

- The default port of the API is 5000, but you can change those defaults in the server/app.ts file. 
- The Web Application is under "http://localhost:3000".
- Default MySQL instance connection string is "localhost" with user "discsadmin" and database "DiscManager", but you can change those defaults in the server/repositories/BaseRepository.ts file.

## Running the tests

To run the tests, run this command:
```
npm run test
```

## Next steps

- Create more unit tests for backend
- Create integration tests with database
- Create front-end tests for React
- Add more reusable components in Web Application
- Add toasts for better user experience

## Built With

* [Express.js](https://expressjs.com) - The web framework used for backed
* [MySQL](https://www.npmjs.com/package/mysql) - Drive to connect to MySQL
* [Jasmine](https://jasmine.github.io/) - Testing
* [React](https://github.com/facebook/react/) - SPA library for front-end

## Author

* **Juan Valenzuela** - (https://github.com/jemanuel2006)
