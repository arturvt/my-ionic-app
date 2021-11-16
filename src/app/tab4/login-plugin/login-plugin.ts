import { WebPlugin } from "@capacitor/core";
import type  { LoginPlugin } from "@swisscom-app/login";


export class LoginPluginWeb extends WebPlugin implements LoginPlugin {

  async echo(options: { value: string }): Promise<{ value: string }> {

    console.log('[LoginPluginWeb] ECHO', options);
    return options;
  }

  async echoUp(options: { value: string }): Promise<{ value: string }> {
    console.log('[LoginPluginWeb] Echo UP', options);
    return options;
  }

}
