import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[newFor]'
})
export class CustomDirective implements OnInit {
  @Input('newForPara') array!: Array<any>;
  @Input('newForGroup') groups!: string;

  constructor(
    private container: ViewContainerRef, // ref tag. exemplo: <li>
    private template: TemplateRef<any> // ref. aos filho da tag
  ) {
  }

  ngOnInit(): void {
    console.log('custom directive', this.array, this.groups);

    const filteredList = this.array.filter(value => value.role === this.groups)

    for (let item of filteredList) {
      this.container.createEmbeddedView(
        this.template, { $implicit: item }
      )
    }
  }

}
