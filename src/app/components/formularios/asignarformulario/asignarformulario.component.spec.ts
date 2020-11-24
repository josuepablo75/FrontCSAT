import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarformularioComponent } from './asignarformulario.component';

describe('AsignarformularioComponent', () => {
  let component: AsignarformularioComponent;
  let fixture: ComponentFixture<AsignarformularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarformularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarformularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
