import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminMobilityComponent } from './admin-mobility.component';

describe('AdminMobilityComponent', () => {
  let component: AdminMobilityComponent;
  let fixture: ComponentFixture<AdminMobilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMobilityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminMobilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
