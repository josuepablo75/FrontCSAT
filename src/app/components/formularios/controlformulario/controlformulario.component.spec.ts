import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlformularioComponent } from './controlformulario.component';

describe('ControlformularioComponent', () => {
  let component: ControlformularioComponent;
  let fixture: ComponentFixture<ControlformularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlformularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlformularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
