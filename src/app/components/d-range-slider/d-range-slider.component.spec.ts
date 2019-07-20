import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DRangeSliderComponent } from './d-range-slider.component';

describe('DRangeSliderComponent', () => {
  let component: DRangeSliderComponent;
  let fixture: ComponentFixture<DRangeSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DRangeSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DRangeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
