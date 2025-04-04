import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipieItemComponent } from './recipie-item.component';

describe('RecipieItemComponent', () => {
  let component: RecipieItemComponent;
  let fixture: ComponentFixture<RecipieItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipieItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipieItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
