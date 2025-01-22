import { TestBed, ComponentFixture } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { PoetryService } from "./services/poetry.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of, throwError } from "rxjs";
import { ResultsComponent } from "./results/results.component";
import { PoemComponent } from "./poem/poem.component";
import { SearchParams } from "./search/search.interface";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let poetryServiceMock: jasmine.SpyObj<PoetryService>;

  beforeEach(() => {
    poetryServiceMock = jasmine.createSpyObj("PoetryService", [
      "getPoemsByAuthorAndTitle",
      "getPoemsByTitle",
      "getPoemsByAuthor",
      "getPoemsByRandom",
    ]);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatProgressSpinnerModule,
        AppComponent,
        ResultsComponent,
        PoemComponent,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: PoetryService, useValue: poetryServiceMock }],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should call search and update poems$", () => {
    const mockPoems = [
      { title: "Poem 1", author: "Author 1", lines: ["line1"], linecount: 1 },
    ];
    const params: SearchParams = { title: "Poem 1", author: "Author 1" };

    poetryServiceMock.getPoemsByAuthorAndTitle.and.returnValue(of(mockPoems));

    component.search(params);

    expect(component.loading).toBe(true);

    fixture.detectChanges();

    component.poems$.subscribe((poems) => {
      expect(poems).toEqual(mockPoems);
    });
  });

  it("should fetch random poems and update poems$", () => {
    const mockPoems = [
      {
        title: "Random Poem",
        author: "Random Author",
        lines: ["line1"],
        linecount: 1,
      },
    ];
    const count = 3;

    poetryServiceMock.getPoemsByRandom.and.returnValue(of(mockPoems));

    component.getRandom(count);
    expect(component.loading).toBe(true);

    fixture.detectChanges();

    component.poems$.subscribe((poems) => {
      expect(poems).toEqual(mockPoems);
    });
  });

  it("should open the poem view", () => {
    const poem = {
      title: "Poem 1",
      author: "Author 1",
      lines: ["line1"],
      linecount: 1,
    };
    component.openPoem(poem);

    fixture.detectChanges();

    expect(component.poemView.poem).toBe(poem);
  });
});
