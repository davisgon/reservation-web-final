import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReservationDetailComponent } from './create-reservation-detail.component';

describe('CreateReservationDetailComponent', () => {
  let component: CreateReservationDetailComponent;
  let fixture: ComponentFixture<CreateReservationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateReservationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReservationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
