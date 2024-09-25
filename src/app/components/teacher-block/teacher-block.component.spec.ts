import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherBlockComponent } from './teacher-block.component';

describe('TeacherBlockComponent', () => {
  let component: TeacherBlockComponent;
  let fixture: ComponentFixture<TeacherBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
