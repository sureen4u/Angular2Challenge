import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers:[GameService]
})
export class GameComponent implements OnInit {

  constructor(private gameService: GameService) { }
  drawnCards = null;
  deck = null
  showIt = false;
  end = false;
  reshuffleAndDrawCards()
  {
  this.gameService.reShuffle(this.deck.deck_id).subscribe(
    (cards) => this.drawCards()
  );
  }
  showResult(higher)
  {
   var isHigher = this.gameService.isHigher(this.drawnCards.cards[1].value,this.drawnCards.cards[0].value);
    if(higher && isHigher || !higher && !isHigher) {
      alert("You Win!")
    }
    else
    {
      alert("Better Luck Next Time")
    }
    this.showIt = true;
    this.end = true;
  }
  resetGame()
  {
    this.reshuffleAndDrawCards();
  }
  drawCards(){
    this.gameService.drawCards(this.deck.deck_id).subscribe(
      (cards) => this.validateCards(cards)
    );
  }
  validateCards(cardRes){
    if(cardRes && cardRes.cards)
    {
      if(cardRes.cards[0].value == cardRes.cards[1].value){
        this.reshuffleAndDrawCards();
      }
      else
      {
        this.drawnCards= cardRes;
        this.end= false;
        this.showIt = false;
      }
    }
  }
  ngOnInit() {
    this.gameService.getDeck().subscribe(
      (deck) => {this.deck = deck; this.drawCards()}
    );
  }

}
