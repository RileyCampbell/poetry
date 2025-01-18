// import { ComponentFixture, TestBed } from "@angular/core/testing";
// import { ResultsComponent } from "./results.component";
// import { MatTableModule } from "@angular/material/table";
// import { MatSortModule } from "@angular/material/sort";
// import { MatPaginatorModule } from "@angular/material/paginator";
// import { MatInputModule } from "@angular/material/input";
// import { MatButtonModule } from "@angular/material/button";
// import { By } from "@angular/platform-browser";
// import { MatSort } from "@angular/material/sort";
// import { MatPaginator } from "@angular/material/paginator";
// import { of } from "rxjs";
// import { Poem } from "../services/poem.interface";

// describe("ResultsComponent", () => {
//   let component: ResultsComponent;
//   let fixture: ComponentFixture<ResultsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         MatTableModule,
//         MatSortModule,
//         MatPaginatorModule,
//         MatInputModule,
//         MatButtonModule,
//       ],
//       declarations: [ResultsComponent],
//     }).compileComponents();

//     fixture = TestBed.createComponent(ResultsComponent);
//     component = fixture.componentInstance;
//   });

//   it("should create the component", () => {
//     expect(component).toBeTruthy();
//   });

//   it("should set MatSort and MatPaginator after view initialization", () => {
//     const mockSort = jasmine.createSpyObj("MatSort", [], {});
//     const mockPaginator = jasmine.createSpyObj("MatPaginator", [], {});
//     component.sort = mockSort;
//     component.paginator = mockPaginator;

//     component.ngAfterViewInit();

//     expect(component.tableInfo.sort).toBe(mockSort);
//     expect(component.tableInfo.paginator).toBe(mockPaginator);
//   });

//   it("should update the table data when poems$ changes", () => {
//     const mockPoems: Poem[] = [
//       { title: "Poem 1", author: "Author 1", lines: ["Line 1"], linecount: 1 },
//       {
//         title: "Poem 2",
//         author: "Author 2",
//         lines: ["Line 1", "Line 2"],
//         linecount: 2,
//       },
//     ];
//     component.poems$ = of(mockPoems);

//     component.ngOnChanges({
//       poems$: {
//         currentValue: of(mockPoems),
//         previousValue: null,
//         firstChange: true,
//         isFirstChange: () => true,
//       },
//     });

//     expect(component.tableInfo.data).toEqual(mockPoems);
//   });

//   it("should emit the selected poem when viewPoem is called", () => {
//     spyOn(component.SelectedPoem$, "next");
//     const mockPoem: Poem = {
//       title: "Poem 1",
//       author: "Author 1",
//       lines: ["Line 1"],
//       linecount: 1,
//     };

//     component.viewPoem(mockPoem);

//     expect(component.SelectedPoem$.next).toHaveBeenCalledWith(mockPoem);
//   });

//   it("should display the correct columns in the table", () => {
//     fixture.detectChanges(); // Trigger initial rendering
//     const columnHeaders = fixture.debugElement.queryAll(
//       By.css(".mat-header-cell"),
//     );

//     const columnTexts = columnHeaders.map((header) =>
//       header.nativeElement.textContent.trim(),
//     );
//     expect(columnTexts).toEqual(["Index", "Title", "Author", "Linecount"]);
//   });

//   it("should render the correct number of rows in the table", () => {
//     const mockPoems: Poem[] = [
//       { title: "Poem 1", author: "Author 1", lines: ["Line 1"], linecount: 1 },
//       {
//         title: "Poem 2",
//         author: "Author 2",
//         lines: ["Line 1", "Line 2"],
//         linecount: 2,
//       },
//     ];
//     component.poems$ = of(mockPoems);

//     component.ngOnChanges({
//       poems$: {
//         currentValue: of(mockPoems),
//         previousValue: null,
//         firstChange: true,
//         isFirstChange: () => true,
//       },
//     });

//     fixture.detectChanges(); // Update the table after setting data

//     const tableRows = fixture.debugElement.queryAll(By.css(".mat-row"));
//     expect(tableRows.length).toBe(mockPoems.length);
//   });
// });
