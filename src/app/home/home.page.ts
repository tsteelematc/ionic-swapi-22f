import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../swapi.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private swapiSvc: SwapiService) {}

  planets: string[] = [];

  ngOnInit() {
    this.swapiSvc
      .loadPlanets()
      .subscribe({
         next: (data) => {
          console.log(data);
          this.planets = [
            ...this.planets
            , ...(data.results.map(x => x.name))
          ].sort();
          console.log(this.planets);
         }
        , error: (err) => {
          console.error(err);
        }
      })
    ;
  }
}
