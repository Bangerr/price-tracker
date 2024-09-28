/* eslint-disable @typescript-eslint/no-explicit-any */
export function extractPrice(...elements: any) {
  for (const element of elements) {
    const priceText = element.text().trim();

    if (priceText) return priceText.replace(/[^\d.]/g, "");
  }

  return "";
}

export function extractCurrency(...elements: any) {
  for (const element of elements) {
    const currencyText = element.text().trim().slice(0, 1);

    return currencyText ? currencyText : "";
  }

  return "";
}

export function extractDiscount(...elements: any) {
  for (const element of elements) {
    const discountText = element.text().trim();

    if (discountText) return discountText;
  }

  return "";
}
