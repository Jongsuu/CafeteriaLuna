import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselMenuItemComponent } from './carousel-menu-item.component';

describe('CarouselMenuItemComponent', () => {
  let component: CarouselMenuItemComponent;
  let fixture: ComponentFixture<CarouselMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselMenuItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
