# User service

## Task
```
For your case delivery, we want you to do the following:

1. Develop a simple frontend application that integrates a Rest API
a. Develop a Rest API that manages account information. Data should be stored in
memory. It is up to you to choose which programming language to use, but
JavaScript/TypeScript (Node.js) or Java is encouraged. The API should have
endpoints for the following operations:
i. Create an account
ii. Get a list of accounts
iii. Get the details of a given account
iv. Update the name of a given account
b. The accounts need the following information:
i. accountNumber - 11 character string (OPTIONAL: use the MOD11
algorithm to validate the account number)
ii. accountType - SAVING or CHECKING
iii. accountName - string
iv. currency - Currency of the account defined by ISO 4217
c. Develop a front end application that displays data retrieved from the Rest API.
Which endpoint from the API you integrate is not important to us, and we don’t
expect you to put any effort into making a pretty UI. We do however care about
architecture, testability and clean code. For frontend we prefer React or Vue, but it
is up to you to select the frontend lib/framework to use.

2. Make the application project (source code), including frontend and backend, available for
us on GitHub or a similar service, and make sure to give us access to your solutions at
least 6 hours before the second interview. 

3. The application should:
• Be easy for us to check out and get up and running locally
• Include a test
• Code should be clean and readable, with written documentation if needed```
```

## Project setup
```
npm i
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build:prod
```

### Run tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Build swagger
```
npm run swagger
```

### Api doc here:
```
http://localhost:3000/api-docs/
```

### Postman collection if you like: 
```
./resources/postman
```
