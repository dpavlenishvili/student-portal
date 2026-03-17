import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentSurveysComponent } from './student-surveys.component';

describe('StudentSurveysComponent', () => {
  let component: StudentSurveysComponent;
  let fixture: ComponentFixture<StudentSurveysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentSurveysComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
