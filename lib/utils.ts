import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export const formatMoneyString = (value: string) => {
  value = value.replace(/[^0-9]/g, '');

  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const moneyStringToNumber = (value: string) => {
  return parseInt(value.replace(/[^0-9]/g, ''));
}