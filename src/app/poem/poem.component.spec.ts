import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PoemComponent } from "./poem.component";
import { Poem } from "../services/poem.interface";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";

describe("PoemComponent", () => {
  let component: PoemComponent;
  let fixture: ComponentFixture<PoemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatDividerModule,
        PoemComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PoemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should set the poem input correctly", () => {
    const mockPoem: Poem = {
      title: "Test Poem",
      author: "Test Author",
      lines: ["Line 1", "Line 2"],
      linecount: 2,
    };
    component.poem = mockPoem;
    expect(component.poem).toEqual(mockPoem);
  });

  it("should clear the poem when exitView is called", () => {
    const mockPoem: Poem = {
      title: "Test Poem",
      author: "Test Author",
      lines: ["Line 1", "Line 2"],
      linecount: 2,
    };
    component.poem = mockPoem;
    component.exitView();
    expect(component.poem).toBeNull();
  });

  it("should call exitView when Escape key is pressed", () => {
    spyOn(component, "exitView");
    const event = new KeyboardEvent("keydown", { key: "Escape" });
    component.handleKeydown(event);
    expect(component.exitView).toHaveBeenCalled();
  });

  it("should not call exitView for other keys", () => {
    spyOn(component, "exitView");
    const event = new KeyboardEvent("keydown", { key: "Enter" });
    component.handleKeydown(event);
    expect(component.exitView).not.toHaveBeenCalled();
  });

  it("should attach and detach keydown event listeners", () => {
    spyOn(document, "addEventListener");
    spyOn(document, "removeEventListener");

    component.ngOnInit();
    expect(document.addEventListener).toHaveBeenCalledWith(
      "keydown",
      component.handleKeydown,
    );

    component.ngOnDestroy();
    expect(document.removeEventListener).toHaveBeenCalledWith(
      "keydown",
      component.handleKeydown,
    );
  });
});
