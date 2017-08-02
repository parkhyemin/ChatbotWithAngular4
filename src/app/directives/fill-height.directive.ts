import { HostListener, Directive, ElementRef, Input, AfterViewInit } from '@angular/core';


@Directive({ selector: '[fill-height]' })
export class FillHeightDirective implements AfterViewInit {

	@Input() classNames = null;

	constructor(private el: ElementRef) {
	}

	ngAfterViewInit(): void {
    setTimeout(_=> this.calculateAndSetElementHeight());
		// this.calculateAndSetElementHeight();
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.calculateAndSetElementHeight();
	}

	private calculateAndSetElementHeight() {
		this.el.nativeElement.style.overflow = 'auto';
		const windowHeight = window.innerHeight;
		const elementOffsetTop = this.getElementOffsetTop();
		const elementStyle = window.getComputedStyle(this.el.nativeElement);
    const elementMarginBottom = parseInt(elementStyle.marginBottom, 30);
		const allElementMargin = this.getAllElementMargin();

		this.el.nativeElement.style.height = windowHeight - elementOffsetTop - elementMarginBottom - allElementMargin + 'px';
		// console.log([windowHeight, elementOffsetTop, elementMarginBottom, allElementMargin, this.el.nativeElement.style.height]);
	}

	private getElementOffsetTop() {
		return this.el.nativeElement.getBoundingClientRect().top;
	}

	private getAllElementMargin() {
		if (!this.classNames) { return 0; }
    const offHeight = this.classNames.split(",").map(classNm => {
      const elem = <HTMLElement> window.document.getElementsByClassName(classNm)[0];
      return elem.offsetHeight;
    }).reduce((sum, current) => sum + current);
    return offHeight;
	}
}
