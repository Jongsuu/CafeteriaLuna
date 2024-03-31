import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableCarrouselComponent } from './draggable-carrousel.component';

describe('DraggableCarrouselComponent', () => {
  let component: DraggableCarrouselComponent;
  let fixture: ComponentFixture<DraggableCarrouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraggableCarrouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DraggableCarrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
