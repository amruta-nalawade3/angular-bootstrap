import { Component, OnInit } from '@angular/core';
import { CountriesService } from './countries.service';


@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  public allCountries;
  public numberOfPages;
  public pagedCountries;
  public searchText;
  public pageArray;
  public currentPageNumber;
  public selectedCountry;

  constructor( public restHttpService: CountriesService) { }

  ngOnInit() {

    console.log("countries ngOnInit called")    
    this.restHttpService.getCountries(null).subscribe(
      data => {
        console.log(data);
        this.allCountries = data;
        this.calculateNumberOfPages(this.allCountries.length);
        this.onPageChange(1); 
        console.log(this.numberOfPages);
        console.log(this.pageArray);
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage)
      }
    )
  }

  onSearchChange(searchValue : string ) {  
    console.log(searchValue);
    this.restHttpService.getCountries(searchValue).subscribe(
      data => {
        console.log(data);
        this.allCountries = data;
        this.calculateNumberOfPages(this.allCountries.length);
        this.onPageChange(1);        
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage)
      }
    )
  }

  calculateNumberOfPages(numberOfRecords:number){
    if (this.allCountries.length>10){
      this.numberOfPages = Math.ceil(this.allCountries.length/10);
    }else{
      this.numberOfPages =1;
    }
      this.pageArray=Array(this.numberOfPages).fill(0).map((x,i)=>i+1);
  }

  onPageChange(pageNumber : number ) {
      let startIndex = (pageNumber*10) -10;
      let endIndex = startIndex+10;
      this.currentPageNumber = pageNumber;
      if(this.allCountries.length<endIndex){
        this.pagedCountries=this.allCountries.slice(startIndex,this.allCountries.length);
      }else{
        this.pagedCountries=this.allCountries.slice(startIndex,endIndex);
      }
      console.log(this.pagedCountries);
  }

  nextPage(){
      if(this.currentPageNumber< this.numberOfPages){
        this.onPageChange(this.currentPageNumber+1);
      }
  }
  previousPage(){
    if(this.currentPageNumber > 1){
      this.onPageChange(this.currentPageNumber-1);
    }
  }
  onCountrySelected(country){
    this.selectedCountry =country;
  }

}

