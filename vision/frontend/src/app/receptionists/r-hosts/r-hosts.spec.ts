import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RHosts } from './r-hosts';

describe('RHosts', () => {
  let component: RHosts;
  let fixture: ComponentFixture<RHosts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RHosts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RHosts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
