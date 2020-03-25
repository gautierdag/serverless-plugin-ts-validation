### Example

This is a minimal example of how to use `serverless-plugin-ts-validation`.

In order to use, you first have to install the dependencies with `yarn install` or `npm install` from within the example folder.

You then need to compile the `handler.ts` file to `.js`, you can do so by calling `tsc` or `npm run build`.

Once this is done, you can deploy serverless as you would do with `serverless deploy`.

You can test the `createUser` function by sending a POST to the url where serverless deploys (through Postman or curl or whatever you prefer).

Make sure to send to include the `Content-Type` as `application/json` in your header. This will ensure that the schema validation is used by API Gateway.

You will then only be able to pass json bodies which have `id` and `name` attributes as number and string respectively:

```
{
    id: 1,
    name: "test"
}
```

If you pass other data types to `id` or `name` than those expected, or if these attributes are missing, you will get back:

```
{
    "message": "Invalid request body"
}
```
