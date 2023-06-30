import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  
  profile: ProfileType = {};
  
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(){
    this.http.get(GRAPH_ENDPOINT)
    .subscribe(profile => {
      console.log(profile);
      this.profile = profile;
    });
  }

}


type ProfileType = {
  givenName?: string,
  surname?: string,
  mail?: string,
  id?: string
}