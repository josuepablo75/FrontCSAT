import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarrespuestasComponent } from './visualizarrespuestas.component';

describe('VisualizarrespuestasComponent', () => {
  let component: VisualizarrespuestasComponent;
  let fixture: ComponentFixture<VisualizarrespuestasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarrespuestasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarrespuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
