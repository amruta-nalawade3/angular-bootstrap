import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from 'src/app/countries/country';
import { map } from 'rxjs/operators';
import * as moment from '@moment';


@Injectable()
export class CountriesService {

  public baseUrl = 'https://restcountries.eu/rest/v2'

  public getCountries(searchValue):Observable<Country[]>{
    let endpoint = '/all';
    if (searchValue){
        endpoint ='/name/'+searchValue;
    }
    let response = this._http.get(this.baseUrl + endpoint)
    console.log(response)
    return this._http.get(this.baseUrl + endpoint).pipe(
        map((data: any[]) => data.map((item: any)=> new Country(
            item.name,
            item.capital,
            item.currencies[0].code,
            item.currencies[0].name,
            item.currencies[0].symbol,
            item.flag,
            item.population,
            item.region,
            item.subregion,            
            item.timezones[0],                   
            this.getCurrentTime(item.timezones[0]) 
        ))),
    );
       
  }

  public getCurrentTime(timeZone){
        let utcDateTime = moment.utc();
        let currentDateTime= moment(utcDateTime).utcOffset(timeZone).format("lll");
        return currentDateTime;
  }

  public getSingleCountry(countryName): any {
    let response = this._http.get(this.baseUrl + '/name/' + countryName)
    console.log(response)
    return response;
  }  
  
  constructor(private _http:HttpClient) { }

}