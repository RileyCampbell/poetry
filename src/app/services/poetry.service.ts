import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Poem } from "./poem.interface"; // Make sure to import the interface

@Injectable({
  providedIn: "root",
})
export class PoetryService {
  private apiUrl = "https://poetrydb.org"; // Base URL for PoetryDB API

  constructor(private http: HttpClient) {}

  /**
   * Fetches poems by author and title.
   * @param {string} title The title of the poem to search for.
   * @param {string} author The author of the poem to search for.
   * @return {Observable<Poem[]>} List of poems matching the title and author.
   */
  getPoemsByAuthorAndTitle(author: string, title: string): Observable<Poem[]> {
    const encodedAuthor = encodeURIComponent(author);
    const encodedTitle = encodeURIComponent(title);
    return this._poetryDBRequest(
      `${this.apiUrl}/author/${encodedAuthor}/title/${encodedTitle}`,
    );
  }

  /**
   * Fetches poems by the author's name.
   * @param {string} author The author of the poem to search for.
   * @return {Observable<Poem[]>} List of poems matching the author.
   */
  getPoemsByAuthor(author: string): Observable<Poem[]> {
    const encodedAuthor = encodeURIComponent(author);
    return this._poetryDBRequest(`${this.apiUrl}/author/${encodedAuthor}`);
  }

  /**
   * Fetches poems by the title of the poem.
   * @param {string} title The title of the poem to search for.
   * @return {Observable<Poem[]>} List of poems matching the title.
   */
  getPoemsByTitle(title: string): Observable<Poem[]> {
    const encodedTitle = encodeURIComponent(title);
    return this._poetryDBRequest(`${this.apiUrl}/title/${encodedTitle}`);
  }

  /**
   * Fetches random poems from the PoetryDB API.
   * @param {number} count The number of poemsto search for.
   * @return {Observable<Poem[]>} List of poems matching both the given title and author.
   */
  getPoemsByRandom(count: number): Observable<Poem[]> {
    return this._poetryDBRequest(`${this.apiUrl}/random/${count}`);
  }

  /**
   * Performs the HTTP GET request to PoetryDB API.
   * @param {string} url The updated URL with search parameters.
   * @return {Observable<Poem[]>} The search results observable.
   */
  private _poetryDBRequest(url: string): Observable<Poem[]> {
    return this.http.get<Poem[]>(url).pipe(
      catchError((error) => {
        return throwError(() => new Error("Error fetching data from PoetryDB"));
      }),
    );
  }
}
