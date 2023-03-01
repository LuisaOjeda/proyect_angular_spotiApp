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
      'Authorization': '[{"key":"Authorization","value":"Bearer BQD1ogkaLAuBbic50r-oWLG7Ebx4ebo3MBmeY8n4Bx_bdPH-83cQMbQ_-BHH5IfbBou4bcyPtY5ZbMJ6JaneMtLgb7DjMrQ5CFg3QTItOfyDX11g2i_8","description":"","type":"text","enabled":true}]'
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
