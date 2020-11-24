import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarformularioComponent } from './registrarformulario.component';

describe('RegistrarformularioComponent', () => {
  let component: RegistrarformularioComponent;
  let fixture: ComponentFixture<RegistrarformularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarformularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarformularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
