// import { CommonModule } from "@angular/common";
// import { NO_ERRORS_SCHEMA } from "@angular/core";
// import { ComponentFixture, TestBed } from "@angular/core/testing";
// import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
// import { By } from "@angular/platform-browser";
// import { provideRouter, RouterModule } from "@angular/router";
// import { of, throwError } from "rxjs";
// import Swal from "sweetalert2";
// import { AppComponent } from "./app.component";
// import { PoemComponent } from "./poem/poem.component";
// import { ResultsComponent } from "./results/results.component";
// import { SearchComponent } from "./search/search.component";
// import { Poem } from "./services/poem.interface";
// import { PoetryService } from "./services/poetry.service";

// describe("AppComponent", () => {
//   let fixture: ComponentFixture<AppComponent>;
//   let component: AppComponent;
//   let poetryService: jasmine.SpyObj<PoetryService>;

//   beforeEach(async () => {
//     const poetryServiceSpy = jasmine.createSpyObj("PoetryService", [
//       "getPoemsByAuthorAndTitle",
//       "getPoemsByTitle",
//       "getPoemsByAuthor",
//       "getPoemsByRandom",
//     ]);

//     await TestBed.configureTestingModule({
//       imports: [
//         CommonModule,
//         MatProgressSpinnerModule,
//         RouterModule, // Using RouterModule for routing
//         ResultsComponent,
//         SearchComponent,
//         PoemComponent,
//       ],
//       providers: [
//         provideRouter([]), // Providing an empty router for testing
//         { provide: PoetryService, useValue: poetryServiceSpy },
//       ],
//       schemas: [NO_ERRORS_SCHEMA], // Ignore errors related to external components
//     }).compileComponents();

//     fixture = TestBed.createComponent(AppComponent);
//     component = fixture.componentInstance;
//     poetryService = TestBed.inject(
//       PoetryService,
//     ) as jasmine.SpyObj<PoetryService>;
//     fixture.detectChanges();
//   });

//   it("should create the app component", () => {
//     expect(component).toBeTruthy();
//   });

//   it("should stop showing spinner after search completes", () => {
//     component.search({ title: "Title", author: "Author" });
//     fixture.detectChanges();

//     let spinner = fixture.debugElement.query(By.css("mat-spinner"));
//     expect(spinner).toBeTruthy();

//     // Simulate search completion
//     poetryService.getPoemsByAuthorAndTitle.and.returnValue(of([]));
//     fixture.detectChanges();

//     spinner = fixture.debugElement.query(By.css("mat-spinner"));
//     expect(spinner).toBeFalsy();
//   });

//   it("should call getRandom() and update poems$", () => {
//     spyOn(component, "getRandom").and.callThrough();

//     component.getRandom(5);
//     fixture.detectChanges();

//     expect(component.getRandom).toHaveBeenCalled();
//     expect(component.poems$).toBeTruthy();
//   });

//   it("should call search() and update poems$", () => {
//     spyOn(component, "search").and.callThrough();

//     const mockPoems: Poem[] = [
//       {
//         title: "Poem 1",
//         author: "Author 1",
//         lines: ["Line 1", "Line 2"],
//         linecount: 2,
//       },
//       {
//         title: "Poem 2",
//         author: "Author 2",
//         lines: ["Line 1", "Line 2"],
//         linecount: 2,
//       },
//     ];
//     poetryService.getPoemsByAuthorAndTitle.and.returnValue(of(mockPoems));

//     component.search({ title: "Title", author: "Author" });
//     fixture.detectChanges();

//     expect(component.search).toHaveBeenCalled();
//     expect(component.poems$).toEqual(of(mockPoems));
//   });

//   it("should display a spinner while loading", () => {
//     component.loading = true;
//     fixture.detectChanges();

//     let spinner = fixture.debugElement.query(By.css("mat-spinner"));
//     expect(spinner).toBeTruthy();
//   });

//   it("should show error when search fails", () => {
//     spyOn(Swal, "fire");
//     poetryService.getPoemsByAuthorAndTitle.and.returnValue(
//       throwError(() => new Error("Search failed")),
//     );

//     component.search({ title: "Title", author: "Author" });
//     fixture.detectChanges();

//     expect(Swal.fire).toHaveBeenCalledWith({
//       title: "Search Failed!",
//       text: "Search failed",
//       icon: "error",
//       toast: true,
//       timer: 3000,
//       position: "bottom",
//       timerProgressBar: true,
//       showConfirmButton: false,
//     } as any);
//   });

//   it("should show error when no results found", () => {
//     spyOn(Swal, "fire"); // Mock Swal

//     poetryService.getPoemsByAuthorAndTitle.and.returnValue(of([]));

//     component.search({ title: "Title", author: "Author" });
//     fixture.detectChanges();

//     expect(Swal.fire).toHaveBeenCalledWith({
//       title: "Search Failed!",
//       text: "No search results found.",
//       icon: "error",
//       toast: true,
//       timer: 3000,
//       position: "bottom",
//       timerProgressBar: true,
//       showConfirmButton: false,
//     } as any);
//   });
// });
