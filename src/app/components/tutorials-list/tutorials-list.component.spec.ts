<div class="list row">
  <div class="col-md-8">
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Search by title"
        [(ngModel)]="title"
      />
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary"
          type="button"
          (click)="searchTitle()"
        >
          Search
        </button>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <h4>Tutorials List</h4>
    <ul class="list-group">
      <li
        class="list-group-item"
        *ngFor="let tutorial of tutorials; let i = index"
        [class.active]="i == currentIndex"
        (click)="setActiveTutorial(tutorial, i)"
      >
        {{ tutorial.title }}
      </li>
    </ul>
    <button class="m-3 btn btn-sm btn-danger" (click)="removeAllTutorials()">
      Remove All
    </button>
  </div>
  <div class="col-md-6">
    <div *ngIf="currentTutorial">
      <h4>Tutorial</h4>
      <div>
        <label><strong>Title:</strong></label> {{ currentTutorial.title }}
      </div>
      <div>
        <label><strong>Description:</strong></label>
        {{ currentTutorial.description }}
      </div>
      <div>
        <label><strong>Status:</strong></label>
        {{ currentTutorial.published ? "Published" : "Pending" }}
      </div>
      <a class="badge badge-warning" href="/tutorials/{{ currentTutorial.id }}">
        Edit
      </a>
    </div>
    <div *ngIf="!currentTutorial">
      <br />
      <p>Please click on a Tutorial...</p>
    </div>
  </div>
</div>