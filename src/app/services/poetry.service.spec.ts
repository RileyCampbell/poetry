import { TestBed } from "@angular/core/testing";
import { PoetryService } from "./poetry.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { of, throwError } from "rxjs";
import { Poem } from "./poem.interface";

describe("PoetryService", () => {
  let service: PoetryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PoetryService],
    });

    service = TestBed.inject(PoetryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should fetch poems by author and title", () => {
    const mockPoems: Poem[] = [
      {
        title: "The Raven",
        author: "Edgar Allan Poe",
        lines: [
          "Once upon a midnight dreary",
          "While I pondered, weak and weary",
        ],
        linecount: 2,
      },
    ];
    const author = "Edgar Allan Poe";
    const title = "The Raven";

    // Simulate the HTTP request and return the mocked response
    service.getPoemsByAuthorAndTitle(author, title).subscribe((poems) => {
      expect(poems.length).toBe(1);
      expect(poems[0].title).toBe("The Raven");
      expect(poems[0].author).toBe("Edgar Allan Poe");
    });

    const req = httpMock.expectOne(
      `https://poetrydb.org/author/${encodeURIComponent(author)}/title/${encodeURIComponent(title)}`,
    );
    expect(req.request.method).toBe("GET");
    req.flush(mockPoems);
  });

  it("should fetch poems by author", () => {
    const mockPoems: Poem[] = [
      {
        title: "Annabel Lee",
        author: "Edgar Allan Poe",
        lines: ["It was many and many a year ago"],
        linecount: 1,
      },
    ];
    const author = "Edgar Allan Poe";

    service.getPoemsByAuthor(author).subscribe((poems) => {
      expect(poems.length).toBe(1);
      expect(poems[0].author).toBe("Edgar Allan Poe");
    });

    const req = httpMock.expectOne(
      `https://poetrydb.org/author/${encodeURIComponent(author)}`,
    );
    expect(req.request.method).toBe("GET");
    req.flush(mockPoems);
  });

  it("should fetch poems by title", () => {
    const mockPoems: Poem[] = [
      {
        title: "The Raven",
        author: "Edgar Allan Poe",
        lines: ["Once upon a midnight dreary"],
        linecount: 1,
      },
    ];
    const title = "The Raven";

    service.getPoemsByTitle(title).subscribe((poems) => {
      expect(poems.length).toBe(1);
      expect(poems[0].title).toBe("The Raven");
    });

    const req = httpMock.expectOne(
      `https://poetrydb.org/title/${encodeURIComponent(title)}`,
    );
    expect(req.request.method).toBe("GET");
    req.flush(mockPoems);
  });

  it("should fetch random poems", () => {
    const mockPoems: Poem[] = [
      {
        title: "The Raven",
        author: "Edgar Allan Poe",
        lines: ["Once upon a midnight dreary"],
        linecount: 1,
      },
    ];
    const count = 2;

    service.getPoemsByRandom(count).subscribe((poems) => {
      expect(poems.length).toBe(1);
    });

    const req = httpMock.expectOne(`https://poetrydb.org/random/${count}`);
    expect(req.request.method).toBe("GET");
    req.flush(mockPoems);
  });

  it("should handle errors gracefully when HTTP request fails", () => {
    const author = "Edgar Allan Poe";

    // Simulate an HTTP error
    service.getPoemsByAuthor(author).subscribe(
      () => fail("Expected error, but got poems"),
      (error) => {
        expect(error).toEqual(new Error("Error fetching data from PoetryDB"));
      },
    );

    const req = httpMock.expectOne(
      `https://poetrydb.org/author/${encodeURIComponent(author)}`,
    );
    req.flush("Error", { status: 500, statusText: "Server Error" });
  });
});
