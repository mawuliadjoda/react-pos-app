
import Lottie from "lottie-react";
import json from "../../lotties/lottie-money.json";

function LottieMoney(prop: any) {
  return <Lottie animationData={json} {...prop} />;
}

export default LottieMoney;
