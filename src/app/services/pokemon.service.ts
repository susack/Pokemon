import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, Subscriber } from 'rxjs';
import { retry, catchError } from 'rxjs/operators'

@Injectable ({
	providedIn: 'root'
})
export class PokeMonService {

		constructor(private httpClient:HttpClient ) {}

		getPokeMonData(nmURL:string): Observable<any> {
			return this.httpClient.get<any> (nmURL)
				.pipe(
					retry(1),
					catchError(this.httpError)
				);
		}

		httpError(error:any) {
			    let msg = '';
			    if(error.error instanceof ErrorEvent) {
			      // client side error
			      msg = error.error.message;
			    } else {
			      // server side error
			      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
			    }
			    console.log(msg);
			    return throwError(msg);
			  }


}