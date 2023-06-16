import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeSkeletonComponent } from './recipe-skeleton.component';

describe('RecipeSkeletonComponent', () => {
  let component: RecipeSkeletonComponent;
  let fixture: ComponentFixture<RecipeSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeSkeletonComponent]
    });
    fixture = TestBed.createComponent(RecipeSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
