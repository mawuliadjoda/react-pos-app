export const sumProductTotal = (updateProducts: any) => {
  const total =
    updateProducts.reduce((prev: any, product: any) => {
      const strValue = (product.quantity * product.amount)
        .toFixed(4)
        .toString()
        .slice(0, -2);

      return parseFloat(strValue) + prev;
    }, 0) || 0;
  return total;
};

export const sumTotalTaxWithoutPercent = (taxes: any) => {
  return (
    taxes
      ?.filter((tax: any) => tax.type !== "percentage")
      ?.reduce((prev: any, tx: any) => {
        return prev + parseFloat(tx.amount);
      }, 0) || 0
  );
};

export const getTotalTaxesWithPercent = (taxes: any, subTotalAmount: any) => {
  const isFindIndex = taxes.findIndex((tax: any) => tax.type === "percentage");
  if (isFindIndex !== -1) {
    let updatedTaxes = [...taxes];
    const amount = (taxes[isFindIndex].value / 100) * subTotalAmount;
    updatedTaxes[isFindIndex] = {
      ...updatedTaxes[isFindIndex],
      amount,
    };
    return [...updatedTaxes];
  }
  return taxes;
};

export const sumTotalTaxes = (taxes: any) => {
  return (
    taxes?.reduce((prev: any, tx: any) => {
      return prev + parseFloat(tx.amount);
    }, 0) || 0
  );
};

export const sumTotalAmount = (subTotal: any, taxAmount: any) => {
  const total = parseFloat(subTotal) + parseFloat(taxAmount);

  return Number.isInteger(total)
    ? total
    : total?.toFixed(4)?.toString()?.slice(0, -2);
};
