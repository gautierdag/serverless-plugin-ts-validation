export namespace Serverless {
  interface Instance {
    cli: {
      log(str: string): void;
    };

    config: {
      servicePath: string;
    };

    service: {
      provider: {
        name: string;
      };
      functions: {
        [key: string]: Serverless.Function;
      };
      package: Serverless.Package;
      getAllFunctions(): string[];
    };

    pluginManager: PluginManager;
  }

  interface Options {
    function?: string;
    watch?: boolean;
    extraServicePath?: string;
  }

  interface Function {
    handler: string;
    events?: Event[];
    package: Serverless.Package;
  }

  interface Event {
    http?: {
      path?: string;
      method?: string;
      integration?: string;
      request?: Request;
    };
  }

  interface Request {
    parameters?: {
      paths?: {
        [key: string]: boolean;
      };
    };
    schema?: Schema[];
  }

  interface Schema {
    [key: string]: string | pluginParameters;
  }

  interface Package {
    include: string[];
    exclude: string[];
    artifact?: string;
    individually?: boolean;
  }

  interface PluginManager {
    spawn(command: string): Promise<void>;
  }
}

interface pluginParameters {
  tsPath: string;
  tsInterface: string;
}
