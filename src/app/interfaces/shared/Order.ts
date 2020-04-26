export enum PaymentProcessor {
  paystack = "paystack",
  flutterwave = "flutterwave",
  banktransfer = "banktransfer",
}

export interface IOrder {
  _id?: string;
  service: string;
  referencenNo?: string;
  processor: PaymentProcessor;
  additionalInfo?: string;
  order: OrderDetails;
}

export enum OrderStatus {
  created = "created",
  successful = "successful",
  failed = "failed",
  pending = "pending",
}

export interface OrderDetails {
  amount: number;
  orderNumber?: string;
  items: string[];
  isDiscountApplied?: boolean;
  isSurchargeApplied?: boolean;
  discountAmountApplied?: number;
  surchargeAmountAplied?: number;
  totalAmount: number;
  quantity: number;
  user?: string;
  orderStatus?: string;
  paymentDate?: Date;
  error?: string;
}
