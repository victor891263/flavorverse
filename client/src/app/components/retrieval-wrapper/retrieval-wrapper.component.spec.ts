import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrievalWrapperComponent } from './retrieval-wrapper.component';

describe('RetrievalWrapperComponent', () => {
  let component: RetrievalWrapperComponent;
  let fixture: ComponentFixture<RetrievalWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetrievalWrapperComponent]
    });
    fixture = TestBed.createComponent(RetrievalWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
