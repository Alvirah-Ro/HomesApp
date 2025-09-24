import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HousingLocationInfo } from './housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  //JSON Server is an open source tool used to create mock REST APIs. It uses a JSON file as a database and provides endpoints for CRUD operations.
  //In this case, we are using a hardcoded array of housing locations from db.json instead of fetching data from an external API or database.  
  //Run this command in split terminal to access: json-server --watch db.json

  locationsUrl = 'http://localhost:3000/locations';
  applicationsUrl = 'http://localhost:3000/applications';

  constructor(private http: HttpClient) {}

  submitApplication(firstName: string, lastName: string, email: string) {
    const application = { firstName, lastName, email };
    return this.http.post(this.applicationsUrl, application).subscribe();
  }


  // For this example, the code uses fetch. For more advanced use cases consider using HttpClient provided by Angular.
  async getAllHousingLocations(): Promise<HousingLocationInfo[]> {
    const data = await fetch(this.locationsUrl);
    return (await data.json()) ?? [];
  }

  // Notice the fetch method has been updated to query the data for location with a matching id property value.
  async getHousingLocationById(id: number): Promise<HousingLocationInfo | undefined> {
    const data = await fetch(`${this.locationsUrl}?id=${id}`);
    const locationJson = await data.json();
    return locationJson[0] ?? {};
  }

}
