import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminMinisterComponent } from './admin-minister.component';

describe('AdminMinisterComponent', () => {
  let component: AdminMinisterComponent;
  let fixture: ComponentFixture<AdminMinisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMinisterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminMinisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
