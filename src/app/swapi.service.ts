import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, expand, repeat, concat } from 'rxjs';

export interface SwapiPlanetShape {
  next: string;
  results: {name: string}[];
}
@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  constructor(private httpSvc: HttpClient) { }

  loadPlanets = () => {
    return this.httpSvc.get<SwapiPlanetShape>("https://swapi.dev/api/planets").pipe(
      // repeat(6)
      expand(x => x.next ? this.httpSvc.get<SwapiPlanetShape>(x.next) : EMPTY)
    );  

    // const p1 = this.httpSvc.get<SwapiPlanetShape>("https://swapi.dev/api/planets");
    // const p2 = this.httpSvc.get<SwapiPlanetShape>("https://swapi.dev/api/planets/?page=2");
     
    // return concat(p1, p2);
  };
}
