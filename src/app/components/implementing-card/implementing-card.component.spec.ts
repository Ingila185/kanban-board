import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementingCardComponent } from './implementing-card.component';

describe('ImplementingCardComponent', () => {
  let component: ImplementingCardComponent;
  let fixture: ComponentFixture<ImplementingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImplementingCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImplementingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
