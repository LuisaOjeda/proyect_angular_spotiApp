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
      'Authorization': '[{"key":"Authorization","value":"Bearer BQDVGaE2hKj-IumER9xJDhkQkqE-F11aEvbnnyqj7Z3cVIGhqjDnHlFI4b-tyq5RfTxIjeH5cGkRiwTmzJZg5EGKDd0zLoxWPpkB9hJ8O9vaTS1RgwHi","description":"","type":"text","enabled":true}]'
    });

    return this.http.get(url, { headers });

  }

  //get de las nuevas canciones en spotify
  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20')
      .pipe(map((data: any) => data['albums'].items));
  }


  //Get de los artistas
  getArtistas(termino: string) {

    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
      .pipe(map((data: any) => data['artists'].items));
  }


  //Get del artista
  getArtista(id: string) {

    return this.getQuery(`artists/${id}`);
    /* .pipe(map((data: any) => data['artists'].items)); */
  }


  //Get del artista
  getTopTracks(id: string) {

    return this.getQuery(`tracks/${id}`);
    /* .pipe(map((data: any) => data['artists'].items)); */
  }

}
