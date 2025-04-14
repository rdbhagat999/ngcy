import { Component } from "@angular/core";
import { NgOptimizedImage } from "@angular/common";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { IProduct } from "@app/_shared/_models";

export type IMyCustomCellRendererParams = {
  buttonText: string;
};

@Component({
  selector: "app-image-cell",
  imports: [NgOptimizedImage],
  template: `
    <div class="realtive flex flex-col justify-start items-center">
      <img
        class="max-w-full object-contain"
        [ngSrc]="product.thumbnail"
        [attr.alt]="product.title"
        width="32"
        height="32"
        priority
      />
    </div>
  `,
  styles: [],
})
export class ImageCellComponent implements ICellRendererAngularComp {
  product!: IProduct;

  agInit(params: ICellRendererParams & IMyCustomCellRendererParams): void {
    this.product = params.data;
    // console.log(params.buttonText);
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}
