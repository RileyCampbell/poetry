// import { ComponentFixture, TestBed } from "@angular/core/testing";
// import { PoemComponent } from "./poem.component";
// import { By } from "@angular/platform-browser";
// import { Poem } from "../services/poem.interface";
// import { CommonModule } from "@angular/common";
// import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"; // Include this if your component uses it

// describe("PoemComponent", () => {
//   let fixture: ComponentFixture<PoemComponent>;
//   let component: PoemComponent;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         CommonModule, // Import CommonModule to handle basic directives
//         PoemComponent, // Import the standalone component directly here
//         MatProgressSpinnerModule, // Include other modules if required
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(PoemComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges(); // Detect initial changes to the component
//   });

//   it("should display poem details when a poem is provided", () => {
//     // Create a mock poem
//     const mockPoem: Poem = {
//       title: "Mock Poem",
//       author: "Mock Author",
//       lines: ["Line 1", "Line 2"],
//       linecount: 2,
//     };

//     // Assign the mock poem to the component
//     component.poem = mockPoem;

//     // Ensure the view is updated after assigning the poem
//     fixture.detectChanges();

//     // Query for DOM elements (Check if elements are available)
//     const titleElement = fixture.debugElement.query(By.css(".poem-title"));
//     const authorElement = fixture.debugElement.query(By.css(".poem-author"));
//     const linesElement = fixture.debugElement.query(By.css(".poem-lines"));

//     // Check if the title, author, and lines are displayed correctly
//     expect(titleElement).toBeTruthy();
//     expect(authorElement).toBeTruthy();
//     expect(linesElement).toBeTruthy();
//     expect(titleElement.nativeElement.textContent).toContain(mockPoem.title);
//     expect(authorElement.nativeElement.textContent).toContain(mockPoem.author);
//     expect(linesElement.nativeElement.textContent).toContain(mockPoem.lines[0]);
//     expect(linesElement.nativeElement.textContent).toContain(mockPoem.lines[1]);
//   });

//   it("should not display poem details when no poem is provided", () => {
//     // Ensure that the component is not given any poem
//     component.poem = null;

//     // Detect changes to trigger view update
//     fixture.detectChanges();

//     // Query for DOM elements (should be null if no poem is provided)
//     const titleElement = fixture.debugElement.query(By.css(".poem-title"));
//     const authorElement = fixture.debugElement.query(By.css(".poem-author"));
//     const linesElement = fixture.debugElement.query(By.css(".poem-lines"));

//     // Ensure the elements are not in the DOM when no poem is provided
//     expect(titleElement).toBeNull();
//     expect(authorElement).toBeNull();
//     expect(linesElement).toBeNull();
//   });
// });
