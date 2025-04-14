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
      @if (product.thumbnail) {
      <img
        class="max-w-full object-contain"
        [ngSrc]="product.thumbnail"
        [attr.alt]="product.title"
        width="32"
        height="32"
        priority
        placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAW0lEQVRYR2PsWr8h1PVu2e9Vzw/13frrsXmmptun33mW3+x51rnwN7bcCpU+v4+W8oyjDhgNgdEQGA2B0RAYDYHREBgNgdEQGA2B0RAYDYHREBgNgdEQGOgQAABL4AjIMPTW8wAAAABJRU5ErkJggg=="
      />
      }
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
