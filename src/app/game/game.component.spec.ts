/* tslint:disable:no-unused-variable */

import { async,inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule,ResponseOptions } from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {Observable} from 'rxjs/Rx';
import {Http,BaseRequestOptions,Response} from '@angular/http';
import { GameService } from './game.service';

import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameComponent ],
      imports:[HttpModule],
      providers: [GameService,
       GameComponent,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend, options) => { return new Http(backend, options); }
        }
       ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should not show Try again initially', () => {
    let fixture = TestBed.createComponent(GameComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.end).toEqual(false);
  });
  it('should show Two buttons with higher and lower', () => {
    let fixture = TestBed.createComponent(GameComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('button')[0].textContent).toContain('Higher');
    expect(compiled.querySelectorAll('button')[1].textContent).toContain('Lower')
  });
  it('should show Two buttons with higher and lower', () => {
    let fixture = TestBed.createComponent(GameComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('button')[0].textContent).toContain('Higher');
    expect(compiled.querySelectorAll('button')[1].textContent).toContain('Lower');
  });
  it('Should make a back end call to pick two cards',
  async(inject([GameService,GameComponent, MockBackend], (gameService: GameService,gameComponent:GameComponent, mockBackend:MockBackend) => {
  return new Promise((resolve, reject) => {
    mockBackend.connections.subscribe(connection => {
        if (connection.request.url === "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1" && connection.request.method === 0) {
          connection.mockRespond(new Response(new ResponseOptions({body: {'deck_id': 1}})));
        }
    });
    let fixture = TestBed.createComponent(GameComponent);
    fixture.detectChanges();
     let component = fixture.debugElement.componentInstance;
     component.ngOnInit();
     expect(component.deck).toBeDefined();
     expect(component.drawnCards).toBeDefined();
  });

  })));

  it('should be reshuffle and draw cards when same value cards drawn',
  async(inject([GameService,GameComponent, MockBackend], (gameService: GameService,gameComponent:GameComponent, mockBackend:MockBackend) => {
  return new Promise((resolve, reject) => {
   var deckId = 1;
   let fixture = TestBed.createComponent(GameComponent);
   fixture.detectChanges();
    let component = fixture.debugElement.componentInstance;
    mockBackend.connections.subscribe(connection => {
        if (connection.request.url === "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1" && connection.request.method === 0) {
          connection.mockRespond(new Response(new ResponseOptions({body: {'deck_id': deckId}})));
        }
        if (connection.request.url === "https://deckofcardsapi.com/api/deck/"+deckId.toString()+"/shuffle/" && connection.request.method === 0) {
          connection.mockRespond(new Response(new ResponseOptions({body: {'deck_id': deckId}})));
        }
        if (connection.request.url === "https://deckofcardsapi.com/api/deck/1/draw/?count=2" && connection.request.method === 0) {
          deckId = deckId+1;
          component.deck.deck_id = deckId;
          connection.mockRespond(new Response(new ResponseOptions(  {body:{'deck_id': deckId, cards:[ {value:2}, {value:2}]}})));
        }
        if (connection.request.url === "https://deckofcardsapi.com/api/deck/2/draw/?count=2" && connection.request.method === 0) {
          deckId = deckId+1;
          connection.mockRespond(new Response(new ResponseOptions(  {body:{'deck_id': deckId, cards:[ {value:1}, {value:2}]}})));
        }
    });

     component.ngOnInit();
     expect(deckId).toEqual(3);
  });
 })));
});
