import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursBlockComponent } from './cours-block.component';

describe('CoursBlockComponent', () => {
  let component: CoursBlockComponent;
  let fixture: ComponentFixture<CoursBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
