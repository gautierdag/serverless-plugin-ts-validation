# serverless-plugin-ts-validation

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![npm version](https://badge.fury.io/js/serverless-plugin-ts-validation.svg)](https://badge.fury.io/js/serverless-plugin-ts-validation)
[![Build Status](https://travis-ci.com/gautierdag/serverless-plugin-ts-validation.svg?branch=master)](https://travis-ci.com/gautierdag/serverless-plugin-ts-validation)

This is a serverless plugin made to enable automatic validation of your AWS lambda functions from typescript interfaces.

This plugin should be compatible with other plugins such as the `serverless-plugin-typescript`.

Under the hood it uses the `ts-json-schema-generator` library to generate a json schema from an interface, and sends it to AWS proxy as an input validator.

The validation enables AWS proxy to validate the input, without needing the lambda functions to be called (saving you some money 💰) and ensuring the inputs to your functions are valid.

## How to use

Define a typescript interface which you would like to use as your validation:

`src/user-schema.interface.ts`

```ts
export interface UserSchema {
  id: number;
  name: string;
}
```

In your `serverless.yml`, you can add the validation as follows:

```yml
plugins:
  - serverless-plugin-ts-validation
---

---

---
functions:
  getUser:
    handler: getUser.handler
    events:
      - http:
          path: /user
          method: post
          request:
            schema:
              application/json:
                tsPath: src/user-schema.interface.ts
                tsInterface: UserSchema
```

You simply have to precise the `tsPath` and `tsInterface` to use to generate the json-schema. The parsing will be done automatically using the `ts-json-schema-generator` library.

When you then pass requests to the route `user` with a content type of `application/json` the passed body will be validated to check for the `id` and `name` attributes.

## Notes:

- This currently works for simple cases, but since the json schema we create is version 7.0, and AWS only supports version 4.0, there might be cases where AWS rejects the schema generated.
- The schema files are not currently stored locally, this could be a potential future feature.
- There are no provided default `tsconfig.json`, you will need to provide your own in the root directory.

This plugin would not have been possible without:

- `ts-json-schema-generator`
- `serverless-plugin-typescript`

## PRs welcomed! 🙂
