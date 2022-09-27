/* eslint-disable class-methods-use-this */

class Common {
  getKeysTyped = Object.keys as <T extends object>(object: T) => Array<keyof T>;
}

export const common = new Common();
