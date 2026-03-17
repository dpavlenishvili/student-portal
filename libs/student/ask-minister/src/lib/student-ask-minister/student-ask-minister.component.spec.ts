import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentAskMinisterComponent } from './student-ask-minister.component';

describe('StudentAskMinisterComponent', () => {
  let component: StudentAskMinisterComponent;
  let fixture: ComponentFixture<StudentAskMinisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAskMinisterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentAskMinisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
