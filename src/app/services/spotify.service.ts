import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('spotify listo');
  }

  //donde va a ir url igual y headrs
  getQuery(query: string) {

    const url = `https://api.spotify.com/v1/${query}`;

    //declaracion de token headers
    const headers = new HttpHeaders({
      'Authorization': '[{"key":"Authorization","value":"Bearer BQBcPGc_3L-amfjGrunVaXj7yIKHMtjvjzEoQVNabPBnhPbGnInI_IFIqyeJCznrkPYXr6SsyYN6c2o4dsYwZLu4QA4QttimuEODElP4Ie_SmEdXQQT_","description":"","type":"text","enabled":true}]'
    });

    return this.http.get(url, { headers });

  }

  //get de las nuevas canciones en spotify
  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20')
      .pipe(map((data: any) => data['albums'].items));
  }


  //Get d elos artistas
  getArtista(termino: string) {

    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
      .pipe(map((data: any) => data['artists'].items));
  }

}
