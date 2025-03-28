import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeStartComponent } from './recipe-start.component';

describe('RecipeStarComponent', () => {
  let component: RecipeStartComponent;
  let fixture: ComponentFixture<RecipeStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeStartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
