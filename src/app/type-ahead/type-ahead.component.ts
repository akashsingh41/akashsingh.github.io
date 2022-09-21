import { Component, Input, OnInit } from '@angular/core';
import { debounceTime, Observable, map } from 'rxjs';
import { ApiService, Country } from '../api.service';
//const countrylist=['aaa','bbb','ccc','aab'];
@Component({
  selector: 'app-type-ahead',
  templateUrl: './type-ahead.component.html',
  styleUrls: ['./type-ahead.component.css']
})
export class TypeAheadComponent implements OnInit{

  countries: any[];
  @Input() Text: string;
  constructor(public apiService: ApiService) {
    this.Text = "";
    this.countries = [];
   }

   ngOnInit(): void {
    this.fetchCountries();
   }

   fetchCountries()
   {
    return this.apiService.getCountries().subscribe((res)=>{
      this.countries = res.map(x=>x.name?.common);
    });
   }

   public literal: any;
   search=(text: Observable<string>)=> 
   text.pipe(
    debounceTime(1000),
    map(str => str === '' ? [] : this.countries.filter(x=>x.toLocaleLowerCase().indexOf(str.toLocaleLowerCase())>-1).slice(0,7)));
   
}
