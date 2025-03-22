import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid'; 

// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;
  constructor(name: string) {
    this.id = uuidv4(); 
    this.name = name;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  filePath: string;
  constructor() {
    this.filePath = './src/searchHistory.json';
  }

  // TODO: Define a read method that reads from the searchHistory.json file
  async read() {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return []; 
    }
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  async write(cities: City[]) {
    await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2), 'utf8');
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    return await this.read();
  }

  // TODO: Define an addCity method that adds a city to the searchHistory.json file
  async addCity(cityName: string) {
    const cities = await this.read();
    const newCity = new City(cityName);
    cities.push(newCity);
    await this.write(cities);
    return newCity;
  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: any) {
    let cities = await this.read();
    cities = cities.filter((city: { id: any; }) => city.id !== id); 
    await this.write(cities);
    return cities;
  }
}

export default new HistoryService();