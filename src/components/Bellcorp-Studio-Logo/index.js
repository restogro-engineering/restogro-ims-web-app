import BellcorpStudioLogo from "../../resources/images/bellcorp-logo-transparent-background.png";
import "./index.scss";

export const BellCorpStudioLogoContainer = ({ customClass }) => {
  return (
    <div className={`BellcorpStudioLogo ${customClass ? customClass : ""}`}>
      Powered by
      <img src={BellcorpStudioLogo} alt="Bellcorp Studio Logo" />
    </div>
  );
};
