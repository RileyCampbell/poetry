import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ResultsComponent } from "./results.component";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Poem } from "../services/poem.interface";
import { of, Subject } from "rxjs";

describe("ResultsComponent", () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;

    const mockPoems: Poem[] = [
      {
        title: "Mock Poem 1",
        author: "Mock Author 1",
        lines: ["Line 1"],
        linecount: 1,
      },
      {
        title: "Mock Poem 2",
        author: "Mock Author 2",
        lines: ["Line 2"],
        linecount: 2,
      },
    ];

    component.poems$ = of(mockPoems);

    component.tableInfo = new MatTableDataSource<Poem>([]);
    component.SelectedPoem$ = new Subject<Poem>();

    fixture.detectChanges();
  });

  afterAll(() => {
    component.tableInfo = new MatTableDataSource<Poem>([]);
    component.SelectedPoem$ = new Subject<Poem>();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should update table data when poems$ emits new data", () => {
    const mockPoems: Poem[] = [
      { title: "Poem 1", author: "Author 1", lines: ["Line 1"], linecount: 1 },
      { title: "Poem 2", author: "Author 2", lines: ["Line 2"], linecount: 2 },
    ];

    component.poems$ = of(mockPoems);

    component.ngOnChanges({
      poems$: {
        currentValue: of(mockPoems),
        firstChange: true,
        previousValue: undefined,
        isFirstChange: () => true,
      },
    });

    expect(component.tableInfo.data).toEqual(mockPoems);
  });

  it("should emit the selected poem when viewPoem is called", (done) => {
    const mockPoem: Poem = {
      title: "Selected Poem",
      author: "Author",
      lines: ["Line 1", "Line 2"],
      linecount: 2,
    };

    component.SelectedPoem$.subscribe((poem) => {
      expect(poem).toEqual(mockPoem);
      done();
    });

    component.viewPoem(mockPoem);
  });
});
