/* tslint:disable:no-unused-variable */

import { TestBed, async, inject  } from '@angular/core/testing';
import { GameService } from './game.service';
import { HttpModule,ResponseOptions } from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {Observable} from 'rxjs/Rx';
import {Http,BaseRequestOptions,Response} from '@angular/http';
import { CommonModule } from '@angular/common';

describe('Service: Game', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend, options) => { return new Http(backend, options); }
        }
       ],
      imports:[HttpModule,CommonModule]
    });
  });

  it('should ...', inject([GameService], (service: GameService) => {
    expect(service).toBeTruthy();
  }));

  it('Has to determine hidden card is higher or lower', inject([GameService], (service: GameService) => {
    var isHigher =  service.isHigher("1","2");
    expect(isHigher).toBeFalsy();
    isHigher =  service.isHigher("ACE","QUEEN");
    expect(isHigher).toBeTruthy();
  }));

  it('isHigher method has to determine hidden card is higher or lower', inject([GameService], (service: GameService) => {
    var isHigher =  service.isHigher("1","2");
    expect(isHigher).toBeFalsy();
    isHigher =  service.isHigher("ACE","QUEEN");
    expect(isHigher).toBeTruthy();
  }));

  it('Should make a back end call to pick two cards',
  async(inject([GameService, MockBackend], (gameService: GameService, mockBackend:MockBackend) => {
  return new Promise((resolve, reject) => {
    mockBackend.connections.subscribe(connection => {
        if (connection.request.url === "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1" && connection.request.method === 0) {
          connection.mockRespond(new Response(new ResponseOptions({body: {'redirect': 'some string'}})));
        }
    });
    gameService.getDeck().subscribe(
      (successResult) => expect(successResult).toBeDefined()
      )
  });
  }))
);

  it('Should make a back end call to pick two cards',
  async(inject([GameService, MockBackend], (gameService: GameService, mockBackend:MockBackend) => {
  return new Promise((resolve, reject) => {
    mockBackend.connections.subscribe(connection => {
        if (connection.request.url === "https://deckofcardsapi.com/api/deck/1/draw/?count=2" && connection.request.method === 0) {
          connection.mockRespond(new Response(new ResponseOptions({body: {'redirect': 'some string'}})));
        }
    });
    let deckId = 1;
    gameService.drawCards(deckId).subscribe(
      (successResult) => expect(successResult).toBeDefined()
      )
  });
})));

});
