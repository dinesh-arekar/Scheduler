import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatformPicker } from './platform-picker';

describe('PlatformPicker', () => {
  let component: PlatformPicker;
  let fixture: ComponentFixture<PlatformPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatformPicker],
    }).compileComponents();

    fixture = TestBed.createComponent(PlatformPicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
