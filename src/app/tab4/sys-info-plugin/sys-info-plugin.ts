import { WebPlugin } from "@capacitor/core";

export class SysInfo extends WebPlugin {

  async getAppInfo(options: { value: string }): Promise<{ value: string }> {
    console.log('[SysInfo] ECHO', options);
    return options;
  }


}