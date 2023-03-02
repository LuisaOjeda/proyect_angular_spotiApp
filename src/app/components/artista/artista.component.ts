import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
})
export class ArtistaComponent {

  artista: any = {};
  loadingArtista: boolean;

  constructor(
    private router: ActivatedRoute,
    private spotify: SpotifyService) {

    this.loadingArtista = true;

    this.router.params.subscribe(params => {
      /* console.log(params['id']); */
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    })
  }

  getArtista(id: string) {

    this.loadingArtista = true;

    this.spotify.getArtista(id)
      .subscribe(artista => {
        /* console.log(artista); */
        this.artista = artista;
        this.loadingArtista = false;
      })
  }


  getTopTracks(id: string) {
    this.spotify.getTopTracks(id)
      .subscribe(topTacks => {
        console.log(topTacks);

      })
  }


}
