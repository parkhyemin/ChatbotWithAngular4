import {AfterContentInit, Directive, ElementRef, HostListener, Input, OnDestroy} from "@angular/core";

@Directive({
    selector: "[ngx-auto-scroll]",
})
export class NgxAutoScroll implements AfterContentInit, OnDestroy {
    @Input("lock-y-offset") public lockYOffset: number = 10;
    @Input("observe-attributes") public observeAttributes: string = "false";

    private nativeElement: HTMLElement;
    private isLocked: boolean = false;
    private mutationObserver: MutationObserver;
    private scrollInitTop: number = 0;

    constructor(element: ElementRef) {
        this.nativeElement = element.nativeElement;
        this.scrollInitTop = this.nativeElement.scrollTop;
    }

    public getObserveAttributes(): boolean {
        return this.observeAttributes !== "" && this.observeAttributes.toLowerCase() !== "false";
    }

    public ngAfterContentInit(): void {
        this.mutationObserver = new MutationObserver(() => {
            if (!this.isLocked) {
                this.scrollDown();
            }
        });
        this.mutationObserver.observe(this.nativeElement, {
            childList: true,
            subtree: true,
            attributes: this.getObserveAttributes(),
        });
    }

    public ngOnDestroy(): void {
        this.mutationObserver.disconnect();
    }

    public forceScrollDown(): void {
        this.scrollDown();
    }

    public forceScrollUp(): void {
        this.scrollUp();
    }

    private scrollDown(): void {
        this.nativeElement.scrollTop = this.nativeElement.scrollHeight;
    }

    private scrollUp(): void {
        this.nativeElement.scrollTop = this.scrollInitTop;
    }

    @HostListener("scroll")
    private scrollHandler(): void {
        const scrollFromBottom = this.nativeElement.scrollHeight - this.nativeElement.scrollTop - this.nativeElement.clientHeight;
        this.isLocked = scrollFromBottom > this.lockYOffset;
    }
}
