import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, expand, repeat } from 'rxjs';

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
  };
}
