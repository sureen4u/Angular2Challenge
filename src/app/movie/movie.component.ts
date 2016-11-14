import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { MovieService } from './movie.service';
import {MdDialog,MdDialogConfig,MdDialogRef} from '@angular/Material';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  providers:[MovieService]
})
 export class MovieComponent implements OnInit {

  movie = {};
  year = null;
  person = {};
  constructor(private movieService: MovieService,public dialog:MdDialog,public vcr:ViewContainerRef) { }
  onPersonSelected(person){
    this.person = person;
    this.openDialog();
  }
  openDialog(){
    let dialogRef: MdDialogRef<personDialog>;
   const config = new MdDialogConfig();
   config.viewContainerRef = this.vcr;
   dialogRef = this.dialog.open(personDialog,config);
   dialogRef.componentInstance.person = this.person;
   if(this.person)
      dialogRef.componentInstance.gender = this.getGender(this.person["gender"]);
   dialogRef.afterClosed().subscribe(() => {
      dialogRef = null;
    });

  }
  getGender(genderKey){
    var gender = "";
    switch(genderKey)
    {
      case 1:
        gender = "Female";
        break;
      case 2:
        gender = "Male";
        break;
    }
    return gender;
  }
  getPerson(movie)
  {
  for(var i=0;i<movie.cast.length;i++){
    this.movieService.getPerson(movie.cast[i].person.id).subscribe(
      (data) => this.movie = data
    );
  }
  }
  ngOnInit() {
    this.movieService.getMovieById(1402).subscribe(
      (data) => {this.movie = data;this.year = new Date(data.releaseDate).getFullYear()}
    );
    this.movieService.getMovieCredit(1402).subscribe(
      (data) => this.getPerson(data)
    );
  }

}

@Component({
  selector: 'person-dialog',
  templateUrl: './movie.dialog.html',
  styleUrls: ['./movie.component.css']
})
export class personDialog  {
  person = null;
  gender=null;
}
