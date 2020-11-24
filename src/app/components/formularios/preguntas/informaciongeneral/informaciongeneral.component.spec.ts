import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformaciongeneralComponent } from './informaciongeneral.component';

describe('InformaciongeneralComponent', () => {
  let component: InformaciongeneralComponent;
  let fixture: ComponentFixture<InformaciongeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformaciongeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformaciongeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
