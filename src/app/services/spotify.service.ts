import { Injectable } from "@angular/core";
import { Http , Headers , Response, URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';
import { DataService } from './data.service';

@Injectable()

export class SpotifyService{
    private searchUrl: string;
    private redirect_uri: string;
    private client_id = this._dataService.client_id;
    private client_secret = this._dataService.client_secret;
    private access_token: string;
    private encoded = btoa(this.client_id + ':' + this.client_secret);
    private base64 = 'OTk2MDgwOTM3ZWJiNDU5NGEwOTc5MTQ2YzljMGMxMjE6MGJkYTNjZmQyMTNjNDYyMmJjNmM1NjI1ODY1NjhlYzg=';

    constructor (private _http:Http, private _dataService:DataService){}

    getToken(){
      var params = ('grant_type=client_credentials');
      var headers = new Headers();
      headers.append('Authorization', 'Basic ' + this.encoded);
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.post('https://accounts.spotify.com/api/token', params, { headers: headers } )
      .map(res=> res.json());
    }

    searchMusic(str: string, type='artist', token: string){
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + token);

      this.searchUrl = 'https://api.spotify.com/v1/search?query='+str+'&offset=0&limit=50&type='+type;
      return this._http.get(this.searchUrl, {headers : headers})
      .map((res: Response) => res.json())
    }


}
