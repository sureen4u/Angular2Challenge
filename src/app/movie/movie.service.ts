import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

class Movie{
title="";
releaseDate = new Date();
rating = 1;
overview ="";
cast=[];

constructor(movie){
  this.title = movie.title;
  this.releaseDate = movie.release_date;
  this.rating = movie.vote_average;
  this.overview = movie.overview;
}

}
class Cast{
  creditId=0;
  castId=0;
  character ='';
  person:Person = null;
  order=0;
  constructor(cast){
    this.creditId = cast.credit_id;
    this.castId = cast.cast_id;
    this.character = cast.character;
    this.order = cast.order;
    this.person = new Person({});
    this.person.id = cast.id,
    this.person.name = cast.name;
    }
}
class Person {
 id = "";
 name="";
 gender="";
 dateOfBirth = new Date();
 dateOfDeath = new Date();
 placeOfBirth = "";
 biography="";
 profilePath = "";

 constructor(person){
   this.id = person.id;
   this.name = person.name;
   this.gender = person.gender;
   this.biography = person.biography;
   this.dateOfBirth = person.birthday;
   this.dateOfDeath = person.deathday;
   this.placeOfBirth = person.place_of_birth;
   this.profilePath = person.profile_path;
 }

}

@Injectable()
export class MovieService {

  movie:Movie = new Movie({});
  constructor(private http : Http) { }

  mapMovie(movie){
   this.movie = new Movie(movie);
   return this.movie;
  }
  mapCast(credit){
  for (var i=0;i<credit.cast.length;i++)
  {
    this.movie.cast.push(new Cast(credit.cast[i]));
    this.getPerson(credit.cast[i].id).subscribe(
    (data) => this.mapPerson(data)
    );
  }
   return this.movie;
  }
  mapPerson(person){
  {
  for (var i=0;i<this.movie.cast.length;i++)
  {
    if(this.movie.cast[i].person.id == person.id)
    {
        this.movie.cast[i].person = new Person(person);
    }
  }
  }
   return this.movie;
  }

  getMovieById(movieId){
    return this.http.get('https://api.themoviedb.org/3/movie/'+movieId.toString()+'?api_key=1e065a98f6eb08277567010690a46ff9').map(
     (data) => this.mapMovie(data.json())
    );
  }
  getMovieCredit(movieId){
    return this.http.get('https://api.themoviedb.org/3/movie/'+movieId.toString()+'/credits?api_key=1e065a98f6eb08277567010690a46ff9').map(
     (data) => this.mapCast(data.json())
    );
  }
  getPerson(personId){
    return this.http.get('https://api.themoviedb.org/3/person/' + personId.toString() +'?api_key=1e065a98f6eb08277567010690a46ff9').map(
     (data) => this.mapPerson(data.json())
    );
  }
}
