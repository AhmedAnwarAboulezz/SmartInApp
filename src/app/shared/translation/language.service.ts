import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IonicStorageService } from 'src/app/core/services/storage/ionicStorageService.service';

@Injectable({
  providedIn: 'root',
})

/**
 * Manipulate the Language for the whole app
 * handle use the default, change, toggle language services
 */
export class LanguageService {
  constructor(
    private translate: TranslateService,
    private storage: IonicStorageService
  ) {}

  /**
   * Enable the language translation options,
   * Set the language to the current user preferred language
   */
  async enableLanguage(): Promise<void> {
    this.translate.setDefaultLang('en');
    this.translate.use(await this.currentLanguage());
  }

  async currentLanguage(): Promise<string> {
    const currentLang = await (await this.storage.get('language')).value;
    return currentLang;
  }

  /**
   * Change the language for the site
   * you can bass a parameter (lang) to the target language
   *
   * @param lang - the target language param
   * @return Returns void
   */
  async setLanguage(lang: string): Promise<void> {
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    await this.storage.set('language',lang);
    this.translate.use(lang);
  }

  /**
   * Toggle the body element lang class
   */
  toggleBodyLanguageClass(): void {
    const bodyClass = document?.querySelector('body')?.classList;
    bodyClass?.remove('lang-ar', 'lang-en');

    if (this.isEnglish()) {
      return bodyClass?.add('lang-en');
    }
    return bodyClass?.add('lang-ar');
  }

  /**
   * Toggle the current language
   */
  toggleLanguage(): void {
    const toggleLang = this.isEnglish() ? 'ar' : 'en';
    document.body.classList.remove('lang-en', 'lang-ar');
    document.body.classList.add(toggleLang === 'en' ? 'lang-en' : 'lang-ar');
    this.setLanguage(toggleLang);
  }

  /**
   * Check the Current Language if english or not
   *
   * @returns True if the current language is english
   */
  async isEnglish(): Promise<boolean> {
    return await this.currentLanguage() === 'en';
  }

  languageChanged(): Observable<any> {
    return this.translate.onLangChange;
  }

  /**
   *
   * @description translate at typescript with translation key
   * @param key - the translation key
   * @returns - the translated value
   *
   */
  translateTs(key: string): string {
    return this.translate.instant(key);
  }
}


