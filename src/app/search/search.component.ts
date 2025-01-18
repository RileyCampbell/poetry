import { CommonModule } from "@angular/common";
import { Component, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { Subject } from "rxjs";
import { SearchParams } from "./search.interface";
import { ReactiveFormsModule } from "@angular/forms";

/**
 * Search Toolbar
 */
@Component({
  selector: "app-search",
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
  @Output() search$ = new Subject<SearchParams>();
  @Output() random$ = new Subject<number>();

  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      title: [""],
      author: [""],
      randomPoemCount: [
        1,
        [
          Validators.pattern("^[0-9]+$"),
          Validators.min(1),
          Validators.max(999),
        ],
      ],
    });
  }

  /**
   * Pass the user input to the search function.
   */
  runSearch() {
    const formValues = this.searchForm.value;
    const parameters: SearchParams = {
      title: formValues.title,
      author: formValues.author,
    };
    this.search$.next(parameters);
  }

  /**
   * Perform a search for random poems based on user input.
   */
  randomPoem() {
    const randomPoemCount =
      parseInt(this.searchForm.value.randomPoemCount, 10) || 0;
    this.random$.next(randomPoemCount);
  }
}
