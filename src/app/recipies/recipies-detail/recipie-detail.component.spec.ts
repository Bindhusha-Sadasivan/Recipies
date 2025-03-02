import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipieDetailComponent } from './recipie-detail.component';

describe('RecipieDetailComponent', () => {
  let component: RecipieDetailComponent;
  let fixture: ComponentFixture<RecipieDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipieDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
