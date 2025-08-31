import { Injectable } from '@angular/core';
import { HousingLocationInfo } from './housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  //JSON Server is an open source tool used to create mock REST APIs. It uses a JSON file as a database and provides endpoints for CRUD operations.
  //In this case, we are using a hardcoded array of housing locations from db.json instead of fetching data from an external API or database.  
  url = 'http://localhost:3000/locations';

  // For this example, the code uses fetch. For more advanced use cases consider using HttpClient provided by Angular.
  async getAllHousingLocations(): Promise<HousingLocationInfo[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  // Notice the fetch method has been updated to query the data for location with a matching id property value.
  async getHousingLocationById(id: number): Promise<HousingLocationInfo | undefined> {
    const data = await fetch(`${this.url}?id=${id}`);
    const locationJson = await data.json();
    return locationJson[0] ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    // This should really use a proper loggin service like Logger instead of console.log
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
  }

}
