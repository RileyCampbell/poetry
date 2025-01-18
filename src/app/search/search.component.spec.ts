// import { ComponentFixture, TestBed } from "@angular/core/testing";
// import { SearchComponent } from "./search.component";
// import { ReactiveFormsModule } from "@angular/forms";
// import { MatInputModule } from "@angular/material/input";
// import { MatButtonModule } from "@angular/material/button";
// import { MatFormFieldModule } from "@angular/material/form-field";
// import { MatIconModule } from "@angular/material/icon";
// import { MatButtonToggleModule } from "@angular/material/button-toggle";
// import { By } from "@angular/platform-browser";

// describe("SearchComponent", () => {
//   let component: SearchComponent;
//   let fixture: ComponentFixture<SearchComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         SearchComponent,
//         ReactiveFormsModule,
//         MatInputModule,
//         MatButtonModule,
//         MatFormFieldModule,
//         MatIconModule,
//         MatButtonToggleModule,
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(SearchComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges(); // Initialize the component
//   });

//   it("should create the component", () => {
//     expect(component).toBeTruthy();
//   });

//   it("should initialize the form with default values", () => {
//     expect(component.searchForm.value).toEqual({
//       title: "",
//       author: "",
//       randomPoemCount: 1,
//     });
//   });

//   it("should emit search$ with correct parameters when runSearch is called", () => {
//     const searchSpy = spyOn(component.search$, "next");
//     component.searchForm.setValue({
//       title: "Test Title",
//       author: "Test Author",
//       randomPoemCount: 5,
//     });

//     component.runSearch();

//     expect(searchSpy).toHaveBeenCalledWith({
//       title: "Test Title",
//       author: "Test Author",
//     });
//   });

//   it("should not emit random$ if randomPoemCount is invalid", () => {
//     const randomSpy = spyOn(component.random$, "next");
//     component.searchForm.controls["randomPoemCount"].setValue(0); // Invalid value

//     component.randomPoem();

//     expect(randomSpy).not.toHaveBeenCalled();
//   });

//   it("should emit random$ with the correct value when randomPoem is called", () => {
//     const randomSpy = spyOn(component.random$, "next");
//     component.searchForm.controls["randomPoemCount"].setValue(3);

//     component.randomPoem();

//     expect(randomSpy).toHaveBeenCalledWith(3);
//   });
// });
