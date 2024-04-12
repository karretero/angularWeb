import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

// Importa directamente los archivos JSON
import * as enTranslations from '@/assets/i18n/en.json';
import * as esTranslations from '@/assets/i18n/es.json';

export class ServicioTranslate implements TranslateLoader {
  // Este método será llamado por ngx-translate para cargar las traducciones
  getTranslation(lang: string): Observable<any> {
    // Decide qué archivo de traducción devolver basado en el idioma solicitado
    switch (lang) {
      case 'en':
        return of(enTranslations);
      case 'es':
        return of(esTranslations);
      default:
        return of(esTranslations);
    }
  }
}
