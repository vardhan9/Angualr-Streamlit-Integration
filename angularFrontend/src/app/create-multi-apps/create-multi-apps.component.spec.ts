import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMultiAppsComponent } from './create-multi-apps.component';

describe('CreateMultiAppsComponent', () => {
  let component: CreateMultiAppsComponent;
  let fixture: ComponentFixture<CreateMultiAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMultiAppsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMultiAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
