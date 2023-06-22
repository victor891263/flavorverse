import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileSkeletonComponent } from './edit-profile-skeleton.component';

describe('EditProfileSkeletonComponent', () => {
  let component: EditProfileSkeletonComponent;
  let fixture: ComponentFixture<EditProfileSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProfileSkeletonComponent]
    });
    fixture = TestBed.createComponent(EditProfileSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
