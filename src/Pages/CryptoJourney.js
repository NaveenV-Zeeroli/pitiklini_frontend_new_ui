import Tree from "../assets/images/tree.png";
import { useTranslation } from "react-i18next";

const CryptoJourney = () => {
  const { t } = useTranslation();

  return (
    <div className="p-10">
      <div className="relative rounded-2xl border border-primary via-transparent to-yellow-500/40 hover:scale-105 transition-all duration-300">
        {/* Inner Card */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20 rounded-2xl h-full overflow-hidden">
          {/* Top Glow Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-yellow-400 blur-sm"></div>

          {/* Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,200,0,0.15),transparent_60%)]"></div>

          {/* Icon */}
          <div className="flex justify-center">
            <img
              src={Tree}
              alt=""
              className="w-[400px] h-[300px] object-contain drop-shadow-[0_0_20px_rgba(255,200,0,0.4)]"
            />
          </div>
          <div className="flex flex-col h-full justify-center self-center">
            <p className="text-primary font-family-ibm mb-0 font-extrabold text-[40px]">
              {t("crypto_journey")}
            </p>
            <p className="text-secondary text-[20px] mt-7 mb-8 font-family-ibm">
              {t("experience_the_future")}{" "}
            </p>
            <p className="bg-primary rounded-[8px] w-fit text-base font-family-ibm text-black px-4 py-4">
              {t("get_started")}{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoJourney;
