import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarusuarioComponent } from './actualizarusuario.component';

describe('ActualizarusuarioComponent', () => {
  let component: ActualizarusuarioComponent;
  let fixture: ComponentFixture<ActualizarusuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarusuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
