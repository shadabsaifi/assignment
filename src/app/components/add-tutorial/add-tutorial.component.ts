import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {
  tutorial = {
    term: '',
    definition: ''
  };
  submitted = false;
  constructor(private tutorialService: TutorialService) { }
  ngOnInit() {
  }
  saveTutorial() {
    this.tutorialService.create(this.tutorial)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
  newTutorial() {
    this.submitted = false;
    this.tutorial = {
      term: '',
      definition: ''
    };
  }
}