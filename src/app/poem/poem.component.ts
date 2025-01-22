import { Component, Input } from "@angular/core";
import { Poem } from "../services/poem.interface";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";

/**
 * Poem view for user selected poem.
 */
@Component({
  selector: "app-poem",
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: "./poem.component.html",
  styleUrl: "./poem.component.scss",
})
export class PoemComponent {
  @Input() poem: Poem | null = null;

  /**
   * This method adds an event listener for the 'keydown' event to detect when the Escape key is pressed.
   */
  ngOnInit() {
    document.addEventListener("keydown", this.handleKeydown);
  }

  /**
   * Closes the poem when the user hits escape.
   */
  handleKeydown = (event: KeyboardEvent) => {
    // Close the poem view if Escape key is pressed
    if (event.key === "Escape") {
      this.exitView();
    }
  };

  /**
   * Exits the read view.
   */
  exitView() {
    this.poem = null;
  }

  /**
   * This method removes the event listener for the 'keydown' event to prevent memory leaks.
   */
  ngOnDestroy() {
    document.removeEventListener("keydown", this.handleKeydown);
  }
}
