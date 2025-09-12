import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RPreregistertions } from './r-preregistertions';

describe('RPreregistertions', () => {
  let component: RPreregistertions;
  let fixture: ComponentFixture<RPreregistertions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RPreregistertions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RPreregistertions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
