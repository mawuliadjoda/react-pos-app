
import Lottie from "lottie-react";
import json from "../../lotties/lottie-persons.json";

function LottiePersons(prop: any) {
  return <Lottie animationData={json} {...prop} />;
}

export default LottiePersons;
