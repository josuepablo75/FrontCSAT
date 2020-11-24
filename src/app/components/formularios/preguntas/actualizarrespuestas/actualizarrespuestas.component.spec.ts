import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarrespuestasComponent } from './actualizarrespuestas.component';

describe('ActualizarrespuestasComponent', () => {
  let component: ActualizarrespuestasComponent;
  let fixture: ComponentFixture<ActualizarrespuestasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarrespuestasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarrespuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
