"use strict";

const tsj = require("ts-json-schema-generator");
import { Serverless } from "./serverless";

/**
 * Generates json schemas from TS interfaces
 *
 * Usage:
 *
 *   myFuncGetItem:
 *     handler: myFunc.handler
 *     name: ${self:provider.stage}-myFunc-get-item
 *     events:
 *       - http:
 *           method: GET
 *           path: mypath
 *           schema:
 *             application / json: myFunc.myFuncInterface
 *
 */
export class ServerlessTSValidatorPlugin {
  serverless: Serverless.Instance;
  options: Serverless.Options;
  hooks: { [key: string]: Function };

  constructor(serverless: Serverless.Instance, options: Serverless.Options) {
    this.serverless = serverless;
    this.options = options;

    this.hooks = {
      "before:deploy:function:packageFunction": async () => {
        await this.generateSchemas();
      }
    };
  }

  async generateSchemas() {
    console.log("Generating Schemas");

    this.serverless.service.getAllFunctions().forEach(functionName => {
      const functionObject = this.serverless.service.functions[functionName];

      functionObject.events.forEach(event => {
        // ignore non-http and missing schema
        const schemas = event?.http?.request?.schema;

        if (schemas === undefined) {
          return;
        }

        // this.serverless.cli.log("Compiling with Typescript...");
        console.log("event[http]");
        console.log(event["http"]);

        if (schemas) {
          Object.keys(schemas).forEach(schemaType => {
            if (!("tsPath" in schemas[schemaType])) {
              console.log("Missing tsPath");
              return;
            }
            if (!("tsInterface" in schemas[schemaType])) {
              console.log("Missing tsInterface");
              return;
            }

            console.log(`schemaType ${schemaType}`);
            console.log(`${schemas[schemaType]["tsPath"]}`);

            console.log("Generating Schema");
            const config = {
              path: schemas[schemaType].tsPath, //path of .ts file
              tsconfig: "tsconfig.json",
              type: schemas[schemaType].tsInterface, // interface type to convert
              expose: "export",
              jsDoc: "extended",
              topRef: false
            };

            const generatedSchema = tsj
              .createGenerator(config)
              .createSchema(config.type);
            console.log("Done generating schema");
            console.log(generatedSchema);
            schemas[schemaType] = JSON.stringify(generatedSchema);
          });
        }
      });
    });
  }
}

module.exports = ServerlessTSValidatorPlugin;
