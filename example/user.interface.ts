export interface UserSchema {
  id: number;
  name: string;
}

export interface UserSchemaLamdaProxyEvent {
  body: UserSchema;
}
