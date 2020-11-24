import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CSATLayoutComponent } from './c-satlayout.component';

describe('CSATLayoutComponent', () => {
  let component: CSATLayoutComponent;
  let fixture: ComponentFixture<CSATLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CSATLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CSATLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
