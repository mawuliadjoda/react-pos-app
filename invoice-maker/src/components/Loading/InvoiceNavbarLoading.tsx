
import Lottie from "lottie-react";
import json from "../../lotties/invoice-navbar.json";

function InvoiceNavbarLoading(prop: any) {
  return <Lottie animationData={json} {...prop} />;
}

export default InvoiceNavbarLoading;
