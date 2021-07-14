import { Component, OnInit  } from '@angular/core';
import { FormControl } from '@angular/forms';

import {map, startWith} from 'rxjs/operators';
import { PokeMonService } from './services/pokemon.service';
import { IResponse, IPokResponse } from './services/response.interface';
import { LocalStorageService } from './services/local.storage.service';
import { Observable, throwError, Subscriber } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
 	myInfo$ = this.localStorageService.myData$;

	constructor(private pokeMonService:PokeMonService,  private localStorageService  : LocalStorageService) {}


  	title = 'pokemonAng12';
  	nameList: any[] = [];
  	pokemonProfile: any = {};
  	pokeMonProfileList: any[] = [];
	namesURL='https://pokeapi.co/api/v2/pokemon?limit=100';	
	baseURL='https://pokeapi.co/api/v2/pokemon/';

	formControl = new FormControl();
  	autoFilter: Observable<string[]> =  new Observable<string[]>();
  	Items: string[] = [];

  	// auto complete filter function
	private mat_filter(value: string): string[] {
	    const filterValue = value.toLowerCase();
	    return this.Items.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
	} 
  	ngOnInit(): void { 
	    this.autoFilter = this.formControl.valueChanges.pipe(
	      startWith(''),
	      map(value => this.mat_filter(value))
	    ); 
	    this.fetchNames(this.namesURL);  

	    //subscribe to the local storage service to get any favorites saved
	    // from last session
		var thisSub = this.myInfo$.subscribe((data) => { 
	    	 console.log('locStor is -> ' + JSON.stringify(data));
	    	 if (data) {
	    	 	this.pokeMonProfileList = data;
	    	 	thisSub.unsubscribe();
	    	 }
	    	},err =>{
				console.log(`Enountered error on subscription for retrieving local storage GET ${err.message}`);
        		alert(err);
      		}
	    );
	    this.localStorageService.loadFavorites();

  	}

	// get all pokemon names
	fetchNames(nmURL:string) {
			this.pokeMonService.getPokeMonData(nmURL).subscribe(( data:IResponse<string> ) => {
				if (this.nameList && this.nameList.length === 0) {
					this.nameList=data.results
				}
				else {
					this.nameList = this.nameList.concat(data.results);
				}
				if (data.next != null) { // get next page of names
					this.fetchNames(data.next)
				}
				else {
					this.nameList.forEach((item) => this.Items.push(item.name));
				}
			},err =>{
				console.log(`Enountered error on subscription for name list ${err.message}`)
        		alert(err);
      		});
		} // end of fetchNames

	onSelFunc(option:any){
		// get individual profile for this pokemon and add it to the list
     	this.fetchProfile(this.baseURL, option); 
    }
    // get all details for this particular pokemon,  name or id
	fetchProfile(baseURL:string, option:string) {
			var profUrl:string = baseURL + option;
			this.pokeMonService.getPokeMonData(profUrl).subscribe(( data:IPokResponse<string> ) => {
				var fnd = this.pokeMonProfileList.find((item) => item.name === option ); 
				if (!fnd) { // only add if it does not exists
						this.pokeMonProfileList.push(data);
				}
			},err =>{
				console.log(`Enountered error on subscription for profile GET ${err.message}`);
        		alert(err);
      		});
	} // end of fetchProfiles

	// save favorites to local storage
	 setFavorites() {
	 	let justFavorite = this.pokeMonProfileList.filter(item => item.selected )
	 	if (justFavorite.length == 0) {
	 		alert('Nothing selected! Please select Favorite checkbox for each item to make Favorite');
	 	}
	 	else if (justFavorite.length <= 6) {
	    	this.localStorageService.setFavorites(justFavorite);
	    	alert('Favorites stored!');
	    }
	    else {
	    	alert('Only up to 6 Favorites allowed!');
	    }
  	 }	
  	 // clear favorite from local storage
  	 clearFavorites() {
	    this.localStorageService.clearFavorites();
	    alert('local storage cleared!');
  	 }	

  	 getRowHighLight(pokeM:any) {
	    if (pokeM.selected) {
	      return {backgroundColor: '#c2dbff'};
	    }
	    return {backgroundColor: 'transparent'};
	 }

	 getSquareIcon(pokeM:any) {
	    if (pokeM.selected != undefined && pokeM.selected) {
	    	
	      	return 'bi-check-square';     
	    } 
	    return 'bi-square';
	  }
	  showAlert() {
	  	alert('Show bootstrap modal/SPA section with all details, i.e. forms, abilities, types, etc');
	  }

}
