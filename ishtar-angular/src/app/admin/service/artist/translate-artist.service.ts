import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArtistTranslation } from '../../entity/artist-translation/artist-translation';
import { Observable } from 'rxjs';
import { AdminConfig } from '../../AdminConfig';

@Injectable({
  providedIn: 'root'
})
export class TranslateArtistService {

  constructor(private httpClient: HttpClient) { }

  postTranslation(translatedArtist: ArtistTranslation): Observable<any> {
    translatedArtist.language = 'de';

    return this.httpClient.post(`${AdminConfig.ArtistTranslationAPI}`, JSON.stringify(translatedArtist), {
      headers: {
        'Content-Language': 'de-DE'
      }
    });
  }
}
