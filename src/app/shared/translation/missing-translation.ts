import {
  MissingTranslationHandler,
  MissingTranslationHandlerParams
} from '@ngx-translate/core';

export class MyMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    let str = params.key;
    str = str
      .replace('.', ' ')
      .replace('_', ' ')
      .replace('-', ' ');
    return str.toUpperCase();
  }
}
