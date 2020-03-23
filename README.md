# serverless-ts-validation

This is a serverless plugin made to enable automatic validation of your AWS lambda functions from typescript interfaces.

Under the hood it uses the `ts-json-schema-generator` library to generate a json schema from an interface, and sends it to AWS proxy as an input validator.

The validation enables AWS proxy to validate the input, without needed the lambda functions to be called.

Notes:

- This currently works for simple cases, but since the json schema we create is version 7.0, and AWS only supports version 4.0, there might be cases where AWS rejects the schema generated.
- The schema files are not currently stored locally, this could be a potential future feature.
