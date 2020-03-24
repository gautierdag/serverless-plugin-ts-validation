# serverless-ts-validation

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

This is a serverless plugin made to enable automatic validation of your AWS lambda functions from typescript interfaces.

Under the hood it uses the `ts-json-schema-generator` library to generate a json schema from an interface, and sends it to AWS proxy as an input validator.

The validation enables AWS proxy to validate the input, without needing the lambda functions to be called (saving you some money 💰) and ensuring the inputs to your functions are valid.

## Notes:

- This currently works for simple cases, but since the json schema we create is version 7.0, and AWS only supports version 4.0, there might be cases where AWS rejects the schema generated.
- The schema files are not currently stored locally, this could be a potential future feature.
- There are no provided default `tsconfig.json`, you will need to provide your own in the root directory.

## PRs welcomed! 🙂
