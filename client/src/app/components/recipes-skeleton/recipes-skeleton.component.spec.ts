import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesSkeletonComponent } from './recipes-skeleton.component';

describe('RecipesSkeletonComponent', () => {
  let component: RecipesSkeletonComponent;
  let fixture: ComponentFixture<RecipesSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipesSkeletonComponent]
    });
    fixture = TestBed.createComponent(RecipesSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
