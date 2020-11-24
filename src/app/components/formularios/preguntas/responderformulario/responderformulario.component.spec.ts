import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderformularioComponent } from './responderformulario.component';

describe('ResponderformularioComponent', () => {
  let component: ResponderformularioComponent;
  let fixture: ComponentFixture<ResponderformularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponderformularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderformularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
