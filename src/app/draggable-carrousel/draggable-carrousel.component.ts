import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CarouselReviewItemComponent } from '../carousel-review-item/carousel-review-item.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CarouselMenuItemComponent } from '../carousel-menu-item/carousel-menu-item.component';

export enum DraggableCarouselType {
  Review,
  Menu
}

@Component({
  selector: 'app-draggable-carrousel',
  standalone: true,
  imports: [
    MatIconModule,
    CarouselReviewItemComponent,
    CarouselMenuItemComponent
  ],
  templateUrl: './draggable-carrousel.component.html',
  styleUrl: './draggable-carrousel.component.css'
})
export class DraggableCarrouselComponent implements OnInit {
  @ViewChild("carousel") carousel!: ElementRef<HTMLUListElement>;

  @Input() items: any[] = [];
  @Input() carouselType: DraggableCarouselType = DraggableCarouselType.Review;

  currentIndex = 0;
  isMobile = false;
  isShortList = false;

  constructor(private responsive: BreakpointObserver) { }

  ngOnInit(): void {
    this.responsive.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe(result => {
      this.isMobile = result.breakpoints[Breakpoints.Small] || result.breakpoints[Breakpoints.XSmall];
    });
  }

  public isReviewItem(): boolean {
    return this.carouselType === DraggableCarouselType.Review;
  }

  public checkRender(): void {
    if (this.carousel && this.carousel.nativeElement.children.length > 0) {
      let itemWidth = (this.carousel.nativeElement.children[0] as HTMLElement).offsetWidth;
      let pageWidth = this.carousel.nativeElement.offsetWidth;
      let itemsInPage = Math.floor(pageWidth / itemWidth);
      this.isShortList = this.items.length <= itemsInPage;
    }
  }

  public next(): void {
    if (this.currentIndex === this.items.length - 1 || this.isShortList)
      return;
    let itemWidth = (this.carousel.nativeElement.children[0] as HTMLElement).offsetWidth;
    let pageWidth = this.carousel.nativeElement.offsetWidth;
    let itemsInPage = Math.floor(pageWidth / itemWidth);
    let newIndex = this.currentIndex + itemsInPage;

    if (newIndex >= this.items.length - itemsInPage)
      newIndex = this.items.length - 1;

    this.currentIndex = newIndex;
    this.updateCarousel();
  }

  public prev(): void {
    if (this.currentIndex === 0)
      return;

    let itemWidth = (this.carousel.nativeElement.children[0] as HTMLElement).offsetWidth;
    let pageWidth = this.carousel.nativeElement.offsetWidth;
    let itemsInPage = Math.floor(pageWidth / itemWidth);
    let newIndex = this.currentIndex - itemsInPage;

    if (newIndex < itemsInPage)
      newIndex = 0;

    this.currentIndex = newIndex;
    this.updateCarousel();
  }

  public updateCarousel(): void {
    this.carousel.nativeElement.children[this.currentIndex].scrollIntoView({ behavior: "smooth", inline: "start", block: "center" });
  }
}
