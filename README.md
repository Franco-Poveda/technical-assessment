# workast-technical-assessment
RESTful API implementation, using express and mongodb. Methods for users and articles domain models are exposed.
Part of Workast technical assessment.


**Prerequisites**

A running instance of mongodb is needed. By default a connection to `mongodb://localhost:27017` is attempt.

Use Node 6.9.0 or higher, together with NPM 3 or higher.

## Install

clone the repository to your local machine and move to project's path:

```bash
git clone git@github.com:Franco-Poveda/workast-technical-assessment.git
cd workast-technical-assessment
```

Install dependencies via NPM:

```bash
npm install
```

alternatively, you can run a full dockerized enviroment, using the provided docker-compose script:

```bash
docker-compose build
docker-compose up
```

 (you need docker && docker-compose alredy installed on your machine)

 ## Usage

 To start the service, you need to provide an environment `TOKEN_KEY`:

 ```bash
 TOKEN_KEY="YOUR_TOKEN_KEY" node .
 ```

The same way `IP`, `PORT` and `MONGODB_URI` can be set, overriding ´config/default.json´ values.

 ## Authorization

 All API endpoints, use `Bearer Token` authorization, as described on [RFC6750](https://tools.ietf.org/html/rfc6750).

 Just add the header `Authorization: Bearer <YOUR_TOKEN_KEY>` to all HTTP requests.

**[API Reference](http://workast.docs.io.s3-website-sa-east-1.amazonaws.com/)**

 Full API documentation, including [cURL](https://curl.haxx.se/) examples can be found online **[HERE](http://workast.docs.io.s3-website-sa-east-1.amazonaws.com/)**.

 Docs can be generated alongside a markdown, run: `npm run docs`. I used Apidocjs inline notation for this.


 ## Running Tests
 
```bash
npm test
```



