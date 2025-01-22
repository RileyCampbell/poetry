import { Component, ViewChild } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ResultsComponent } from "./results/results.component";
import { PoetryService } from "./services/poetry.service";
import { SearchComponent } from "./search/search.component";
import { SearchParams } from "./search/search.interface";
import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Poem } from "./services/poem.interface";
import { PoemComponent } from "./poem/poem.component";
import { Observable, of } from "rxjs";
import Swal from "sweetalert2";

/**
 * Parent component for component and service communication
 */
@Component({
  selector: "app-root",
  standalone: true,
  providers: [PoetryService],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RouterOutlet,
    ResultsComponent,
    SearchComponent,
    PoemComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  @ViewChild(ResultsComponent) table!: ResultsComponent;
  @ViewChild(PoemComponent) poemView!: PoemComponent;

  poems$: Observable<Poem[]> = of([]);
  loading = false;

  constructor(private readonly _poetryService: PoetryService) {}

  /**
   * Opens the poem view.
   * @param {Poem} poem The selected poem to read.
   */
  openPoem(poem: Poem) {
    this.poemView.poem = poem;
  }

  /**
   * Fetches poems with search parameters and updates the poems$ observable.
   * @param {SearchParams} parameters The user's search parameters.
   */
  search(parameters: SearchParams) {
    this.poems$ = of([]);
    this.loading = true;
    let hasResults = false;

    if (parameters.title && parameters.author) {
      this.poems$ = this._poetryService.getPoemsByAuthorAndTitle(
        parameters.author,
        parameters.title,
      );
    } else if (parameters.title) {
      this.poems$ = this._poetryService.getPoemsByTitle(parameters.title);
    } else if (parameters.author) {
      this.poems$ = this._poetryService.getPoemsByAuthor(parameters.author);
    }

    this.poems$.subscribe({
      next: (poems) => {
        if (poems.length > 0) {
          hasResults = true;
        }
      },
      error: (error) => {
        this.loading = false;
        this.showError(error);
      },
      complete: () => {
        this.loading = false;
        if (!hasResults) {
          this.showError("No search results found.");
        }
      },
    });
  }

  /**
   * Fetches random poems and updates the poems$ observable.
   * @param {number} count The user's desired random poem count.
   */
  getRandom(count: number) {
    this.poems$ = of([]);
    this.loading = true;
    let hasResults = false;
    this.poems$ = this._poetryService.getPoemsByRandom(count);

    this.poems$.subscribe({
      next: (poems) => {
        if (poems.length > 0) {
          hasResults = true;
        }
      },
      error: (error) => {
        this.loading = false;
        this.showError(error);
      },
      complete: () => {
        this.loading = false;
        if (!hasResults) {
          this.showError("No search results found.");
        }
      },
    });
  }

  /**
   * Displays an error message to the user.
   * @param {string} message The message to be displayed in the toast.
   */
  showError(message: string): void {
    Swal.fire({
      title: "Search Failed!",
      text: message,
      icon: "error",
      toast: true,
      timer: 3000,
      position: "bottom",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }
}
