import { Component } from '@angular/core';
import { City } from './cities';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-country-cities',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './country-cities.component.html',
  styleUrl: './country-cities.component.css'
})
export class CountryCitiesComponent {
  public cities: City[] = [];
  public displayedColumns: string[] = [ "cityId","latitude","longitude","name","population"];
  id: number;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute){
    this.id = -1;
  }

    ngOnInit(){
      this.getCities();
    }

  getCities() {
    let idparameter = this.activatedRoute.snapshot.paramMap.get("id");
    this.id = idparameter ? + idparameter : 0;

    this.http.get<City[]>(`${environment.baseUrl}/api/Countries/CountryCities/${this.id}`).subscribe(
      {
        next: result => this.cities = result,
        error: error => console.log(error)
      }
    );
  }

}
