import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomappComponent } from './customapp.component';

describe('CustomappComponent', () => {
  let component: CustomappComponent;
  let fixture: ComponentFixture<CustomappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomappComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
