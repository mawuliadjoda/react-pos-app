
import Lottie from "lottie-react";
import json from "../../lotties/lottie-product.json";

function LottieProduct(prop: any) {
  return <Lottie animationData={json} {...prop} />;
}

export default LottieProduct;
