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
 *             application/json:
 *                  tsPath: src/api/models/myFuncInterface.interface.ts
 *                  tsInterface: myFunc.myFuncInterface
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
      "before:run:run": async () => {
        await this.generateSchemas();
      },
      "before:invoke:local:invoke": async () => {
        await this.generateSchemas();
      },
      "before:package:createDeploymentArtifacts": async () => {
        await this.generateSchemas();
      },
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

        this.serverless.cli.log("Compiling with Typescript...");
        if (schemas) {
          Object.keys(schemas).forEach(schemaType => {
            // do nothing if schema is already defined (as string path or json string)
            if (typeof schemas[schemaType] === "string") {
              return;
            }
            const tsPath = schemas[schemaType]?.tsPath;
            const tsInterface = schemas[schemaType]?.tsInterface;
            if (tsPath === undefined || tsInterface === undefined) {
              this.serverless.cli.log(
                `tsPath or tsInterface missing for ${event.http.path}, schema ${schemaType}`
              );
            }
            this.serverless.cli.log(`Generating Schema for ${tsInterface}`);
            const config = {
              path: tsPath, //path of .ts file
              tsconfig: "tsconfig.json",
              type: tsInterface, // interface type to convert
              expose: "export",
              jsDoc: "extended",
              topRef: false
            };

            const generatedSchema = tsj
              .createGenerator(config)
              .createSchema(config.type);
            schemas[schemaType] = JSON.stringify(generatedSchema);
            return;
          });
        }
      });
    });
  }
}

module.exports = ServerlessTSValidatorPlugin;
