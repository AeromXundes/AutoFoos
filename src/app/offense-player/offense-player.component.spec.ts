import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffensePlayerComponent } from './offense-player.component';

describe('OffensePlayerComponent', () => {
  let component: OffensePlayerComponent;
  let fixture: ComponentFixture<OffensePlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffensePlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffensePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
