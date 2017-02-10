import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

export class DataService {
  static get parameters() {
    return [[Http]];
  }

  constructor(private http:Http) {

  }

  searchMovies(url) {
    var response = this.http.get(url).map(res => res.json());
    return response;
  }
}
