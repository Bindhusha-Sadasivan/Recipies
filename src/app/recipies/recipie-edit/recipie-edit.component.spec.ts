import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipieEditComponent } from './recipie-edit.component';

describe('RecipieEditComponent', () => {
  let component: RecipieEditComponent;
  let fixture: ComponentFixture<RecipieEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipieEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipieEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
