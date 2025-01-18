import {
  Component,
  Output,
  Input,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { Poem } from "../services/poem.interface";
import { MatButtonModule } from "@angular/material/button";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { CommonModule } from "@angular/common";
import { Observable, Subject } from "rxjs";

/**
 * Shows search results in sortable table.
 */
@Component({
  selector: "app-results",
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"],
})
export class ResultsComponent implements AfterViewInit, OnChanges {
  @Input() poems$!: Observable<Poem[]>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output() SelectedPoem$ = new Subject<Poem>();

  tableInfo = new MatTableDataSource<Poem>([]);
  displayedColumns = ["index", "title", "author", "linecount"];

  /**
   * Initializes material table features
   */
  ngAfterViewInit() {
    this.tableInfo.sort = this.sort;
    this.tableInfo.paginator = this.paginator;
  }

  /**
   * Update table values on change
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes["poems$"] && this.poems$) {
      this.poems$.subscribe((poems) => {
        this.tableInfo.data = poems;
      });
    }
  }

  /**
   * Updates selectedPoem observable to populate poem view.
   * @param {Poem} poem The selected poem.
   */
  viewPoem(poem: Poem) {
    this.SelectedPoem$.next(poem);
  }
}
