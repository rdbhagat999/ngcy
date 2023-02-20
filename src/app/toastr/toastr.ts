export class Toastr {
  id?: string;
  type?: ToastrType;
  title?: string;
  message?: string;
  autoClose?: boolean;
  keepAfterRouteChange?: boolean;

  constructor(init?: Partial<Toastr>) {
    Object.assign(this, init);
  }
}

export enum ToastrType {
  Success,
  Error,
  Info,
  Warning,
}

export class ToastrOptions {
  id?: string;
  autoClose?: boolean;
  keepAfterRouteChange?: boolean;
}
