
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class GameService {
  order = ["1","2","3","4","5","6","7","8","9","10","JACK","QUEEN","KING","ACE"];
  constructor(private http:Http) { }

  isHigher(value,otherValue)
  {
    for(var i=0;i<this.order.length;i++)
    {
      if(this.order[i] == value) {
        return false;
      }
      if(this.order[i] == otherValue) {
        return true;
      }
    }
    return false;
  }

  drawCards(deckId){
    return this.http.get('https://deckofcardsapi.com/api/deck/'+deckId.toString()+'/draw/?count=2').map(
     (data) => data.json()
    );
  }
  reShuffle(deckId){
    return this.http.get('https://deckofcardsapi.com/api/deck/'+deckId.toString()+'/shuffle/').map(
     (data) => data.json()
    );
  }
  getDeck(){
    return this.http.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').map(
     (data) => data.json()
    );
  }

}
