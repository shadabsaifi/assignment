import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {
  currentTutorial:any;
  message = '';
  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit() {
    this.message = '';
    this.getTutorial(this.route.snapshot.paramMap.get('id'));
  }
  getTutorial(id:any) {
    this.tutorialService.startLoader();
    this.tutorialService.get(id)
      .subscribe(
        (data:any) => {
          this.tutorialService.stopLoader();
          if(data['responseCode'] == 200){
            this.currentTutorial = data.result;
          }
        },
        error => {
          this.tutorialService.stopLoader();
          console.log(error);
        });
  }
  updateTutorial() {
    this.tutorialService.update(this.currentTutorial._id, this.currentTutorial)
      .subscribe(
        (data:any) => {
          if(data['responseCode'] == 200){
            this.message = 'The tutorial was updated successfully!';
          }
          else{
            this.message = 'The tutorial not updated!';
          }
        },
        error => {
          console.log(error);
        });
  }
  deleteTutorial() {
    this.tutorialService.delete(this.currentTutorial._id)
      .subscribe(
        (data:any) => {
          if(data['responseCode'] == 200){
            this.router.navigate(['/assignment']);
          }
          else{
            this.message = 'The tutorial not deleted!';
          }
        },
        error => {
          console.log(error);
        });
  }

  backTutorial(){
    this.router.navigate(['/assignment']);
  }
}