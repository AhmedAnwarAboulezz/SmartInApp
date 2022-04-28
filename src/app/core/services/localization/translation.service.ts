import { Injectable, RendererFactory2, Renderer2, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { IonicStorageService } from '../storage/ionicStorageService.service';
import { DOCUMENT } from '@angular/common';


@Injectable({
  providedIn: 'root'
})

/**
 * Auth Services
 * the main service for authentications
 */
export class TranslationService {
  langs = ['en', 'fr', 'ar'];
  lang;
  currentLanguage = new BehaviorSubject<string>(null);
  private renderer: Renderer2;
  constructor(
    public translate: TranslateService,
    private rendererFactory: RendererFactory2,
    private platform: Platform,
    private storage: IonicStorageService,
    @Inject(DOCUMENT) private doc
  ) {
    this.checkLanguageInStorage();
  }
  async checkLanguageInStorage() {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    const currentLang = await (await this.storage.get('language')).value;
    this.lang = (currentLang != null && currentLang != "") ? currentLang : 'en';
  }

  async setDefaultLanguage() {
    this.translate.addLangs(['en', 'fr', 'ar']);
    const currentLang = await (await this.storage.get('language')).value;
    this.lang = (currentLang != null && currentLang != "") ? currentLang : 'en';
    await this.storage.set('language',this.lang);
    this.translate.setDefaultLang(this.lang);
    this.translate.use(this.lang === undefined ? 'en' : this.lang);
    document.body.classList.remove('lang-en', 'lang-ar');
    this.setAppDirection();
  }
  setAppDirection(): void {
    const platform = this.platform.is('desktop');
    // if this is a desktop app change the direction of the styles
    // if (platform) {
    if (this.lang === 'ar') {
      this.doc.dir = 'rtl';
      document.body.classList.add('lang-ar');

    } else {
      this.doc.dir = 'ltr';
      document.body.classList.add('lang-en');
    }
    // }
  }

  useLanguage(lang: string): void {
    this.translate.setDefaultLang(lang);
    localStorage.setItem('language', lang);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }

  setLanguage(lang: string) {
    
    this.currentLanguage.next(lang);
    this.lang = lang;
    this.setAppDirection();
    this.translate.use(lang);
  }
  isEnglish(): boolean {
    const currentLang = this.translate.currentLang;
    if (currentLang === 'en') {
      return true;
    } else {
      return false;
    }
  }
}
