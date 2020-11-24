import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioncatalogosComponent } from './gestioncatalogos.component';

describe('GestioncatalogosComponent', () => {
  let component: GestioncatalogosComponent;
  let fixture: ComponentFixture<GestioncatalogosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestioncatalogosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioncatalogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
