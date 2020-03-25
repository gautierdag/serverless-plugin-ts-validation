"use strict";

import { UserSchema, UserSchemaLamdaProxyEvent } from "./user.interface";

export const handler = async (event: UserSchemaLamdaProxyEvent) => {
  const user: UserSchema = event.body;
  console.log(`User object passed validation: ${user}`);
  return {
    statusCode: "201",
    body: JSON.stringify({ success: true, user: user }),
    headers: {
      "Content-Type": "application/json"
    }
  };
};
