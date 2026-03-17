import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentMobilityComponent } from './student-mobility.component';

describe('StudentMobilityComponent', () => {
  let component: StudentMobilityComponent;
  let fixture: ComponentFixture<StudentMobilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentMobilityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentMobilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
