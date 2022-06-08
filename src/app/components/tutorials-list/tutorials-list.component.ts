import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {
  tutorials: any = [];
  currentTutorial:any;
  currentIndex = -1;
  title = '';
  currentPage:number = 1;
  itemsPerPage:number = 10;
  totalItems:number = 0;
  constructor(private tutorialService: TutorialService) { }
  ngOnInit() {
    this.retrieveTutorials();
  }
  retrieveTutorials() {
    this.tutorialService.startLoader();
    var query = `?page=${this.currentPage}&limit=${this.itemsPerPage}`;
    if(this.title != "") query = `${query}&term=${this.title}`;
    this.tutorialService.getAll(query)
      .subscribe((data:any) => {
        this.tutorialService.stopLoader();
          if(data['responseCode'] == 200){
            this.tutorials = data.result.docs;
            this.totalItems = data.result.total;
          }
        },
        error => {
          this.tutorialService.stopLoader();
          console.log(error);
        });
  }
  refreshList() {
    this.retrieveTutorials();
    this.currentTutorial = null;
    this.currentIndex = -1;
  }
  setActiveTutorial(tutorial:any, index:any) {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }
  removeAllTutorials() {
    this.tutorialService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveTutorials();
        },
        error => {
          console.log(error);
        });
  }
  searchTitle() {
    this.retrieveTutorials();
  }

  pageChanged(page:number){
    this.currentPage = page;
    this.retrieveTutorials();
  }

}