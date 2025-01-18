// import { TestBed } from "@angular/core/testing";
// import {
//   provideHttpClient,
//   withInterceptorsFromDi,
//   HttpClient,
// } from "@angular/common/http";
// import {
//   HttpTestingController,
//   provideHttpClientTesting,
// } from "@angular/common/http/testing";
// import { PoetryService } from "./poetry.service";
// import { Poem } from "./poem.interface";
// import { of, throwError } from "rxjs";

// describe("PoetryService", () => {
//   let service: PoetryService;
//   let httpClient: HttpClient;
//   let httpTestingController: HttpTestingController;

//   const mockPoems: Poem[] = [
//     {
//       title: "title",
//       author: "author",
//       lines: ["line_1"],
//       linecount: 10,
//     },
//   ];

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         PoetryService,
//         provideHttpClientTesting(),
//         provideHttpClient(withInterceptorsFromDi()),
//       ],
//     });

//     service = TestBed.inject(PoetryService);
//     httpClient = TestBed.inject(HttpClient);
//     httpTestingController = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     // Ensure that no outstanding HTTP requests are pending.
//     httpTestingController.verify();
//   });

//   it("should be created", () => {
//     expect(service).toBeTruthy();
//   });

//   it("should fetch poems by title", () => {
//     service.getPoemsByTitle("title");

//     const req = httpTestingController.expectOne(
//       "https://poetrydb.org/title/title",
//     );
//     expect(req.request.method).toBe("GET");
//     expect(req.request.responseType).toBe("json");
//     req.flush(mockPoems);
//   });

//   it("should fetch poems by author", () => {
//     service.getPoemsByAuthor("author");
//     const req = httpTestingController.expectOne(
//       "https://poetrydb.org/author/author",
//     );
//     expect(req.request.method).toBe("GET");
//     expect(req.request.responseType).toBe("json");
//     req.flush(mockPoems);
//   });

//   it("should fetch poems by title and author", () => {
//     service.getPoemsByAuthorAndTitle("author", "title");
//     const req = httpTestingController.expectOne(
//       "https://poetrydb.org/author/author/title/title",
//     );
//     expect(req.request.method).toBe("GET");
//     expect(req.request.responseType).toBe("json");
//     req.flush(mockPoems);
//   });

//   it("should fetch random poems", () => {
//     service.getPoemsByRandom(1);
//     const req = httpTestingController.expectOne(
//       "https://poetrydb.org/random/1",
//     );
//     expect(req.request.method).toBe("GET");
//     expect(req.request.responseType).toBe("json");
//     req.flush(mockPoems);
//   });

//   it("should handle errors when fetching poems by title", () => {
//     spyOn(httpClient, "get").and.returnValue(
//       throwError(() => new Error("Error fetching data from PoetryDB")),
//     );

//     service.getPoemsByTitle("Nonexistent Title").subscribe({
//       next: () => fail("should have failed with error"),
//       error: (err) =>
//         expect(err.message).toBe("Error fetching data from PoetryDB"),
//     });
//   });

//   it("should handle errors when fetching poems by author", () => {
//     spyOn(httpClient, "get").and.returnValue(
//       throwError(() => new Error("Error fetching data from PoetryDB")),
//     );

//     service.getPoemsByAuthor("Nonexistent Author").subscribe({
//       next: () => fail("should have failed with error"),
//       error: (err) =>
//         expect(err.message).toBe("Error fetching data from PoetryDB"),
//     });
//   });

//   it("should handle errors when fetching random poems", () => {
//     spyOn(httpClient, "get").and.returnValue(
//       throwError(() => new Error("Error fetching data from PoetryDB")),
//     );

//     service.getPoemsByRandom(1).subscribe({
//       next: () => fail("should have failed with error"),
//       error: (err) =>
//         expect(err.message).toBe("Error fetching data from PoetryDB"),
//     });
//   });

//   it("should handle errors when fetching poems by author and title", () => {
//     spyOn(httpClient, "get").and.returnValue(
//       throwError(() => new Error("Error fetching data from PoetryDB")),
//     );

//     service
//       .getPoemsByAuthorAndTitle("Nonexistent Author", "Nonexistent Title")
//       .subscribe({
//         next: () => fail("should have failed with error"),
//         error: (err) =>
//           expect(err.message).toBe("Error fetching data from PoetryDB"),
//       });
//   });
// });
