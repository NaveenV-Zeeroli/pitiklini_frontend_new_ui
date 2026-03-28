import React from "react";
import {
  Upload,
  UserCheck,
  Shield,
  DollarSign,
  Settings,
  FileText,
  PlayCircle,
  Star,
  Search,
} from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import Support from "../assets/images/custom-support.svg";
import Help from "../assets/images/help.svg";

const services = [
  { title: "Upload and Appeal", icon: Upload },
  { title: "Reset ID Verification", icon: UserCheck },
  { title: "Reset 2FA", icon: Shield },
  { title: "Deposit / Withdrawal", icon: DollarSign },
  { title: "Account Feature", icon: Settings },
  { title: "KYC Submission", icon: FileText },
  { title: "Demo Version", icon: PlayCircle },
  { title: "Elite trader", icon: Star },
];
const guide = [
  { title: "Account Feature", icon: Upload },
  { title: "Foundation ", icon: UserCheck },
  { title: "Deposit & Withdrawal", icon: Shield },
  { title: "Trading Tutorial", icon: DollarSign },
];

const faq = [
  {
    title: "Account",
    title_1: "Account management and security",
    tiltle_content_1:
      "Manage your personal info, account status, and security settings",
    title_2: "Verification",
    title_content_2: "Complete your identity verification",
  },
  {
    title: "Trading",
    title_1: "Convert",
    tiltle_content_1: "Manage your crypto",
    title_2: "Spot trading",
    title_content_2: "Buy and sell crypto at the current market price",
  },
  {
    title: "Information",
    title_1: "Fraud prevention",
    tiltle_content_1:
      "Explore further on recognizing fraudulent activity, fraudulent accounts, and the appropriate actions to take during or after encountering fraud",
    title_2: "Account and wallet safeguard",
    title_content_2:
      "Learn about methods and preventative measures for scams targeting accounts and wallets",
  },
];

const SupportPage = () => {
  return (
    <>
      <Header />
      <div className="top-[120px]">
        <img src={Help} alt="" className="mx-auto pt-[120px]" />
        <div className="hero_section_content mt-10 w-full">
          <h1 className="text-primary text-center text-[48px] mx-auto max-w-[750px]">
            Here to help you 24/7
          </h1>
          <div className="flex w-full gap-4 justify-center mx-auto">
            <div className="flex gap-2 justify-start max-w-[500px] bg-gray rounded-[8px] py-4 px-8">
              <Search className="text-primary" />
              <p className="text-primary self-center w-fit mb-0">Search</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#18191D59] px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <h2 className="text-primary text-2xl font-semibold mb-8">
            Self-service
          </h2>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="relative rounded-xl p-[1px] bg-black/35 hover:scale-[1.03] transition-all duration-300"
                >
                  {/* Card */}
                  <div className="relative bg-[#0f172a] rounded-xl px-5 py-8 flex items-center gap-4 overflow-hidden border border-black/35">
                    <div className="absolute top-0 block h-[1px] left-0 right-0 w-[70%] bg-secondary10/35 mx-auto"></div>
                    {/* Glow Background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(255,200,0,0.08),transparent_60%)]"></div>

                    {/* Icon */}
                    <div className="z-10 text-white">
                      <Icon size={22} />
                    </div>

                    {/* Text */}
                    <p className="z-10 text-primary font-medium text-xl">
                      {item.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="bg-[#18191D59] px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <h2 className="text-primary text-2xl font-semibold mb-8">
            Beginner’s Guide
          </h2>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {guide.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="relative rounded-xl p-[1px] bg-black/35 hover:scale-[1.03] transition-all duration-300"
                >
                  {/* Card */}
                  <div className="relative bg-[#0f172a] rounded-xl px-5 py-8 flex items-center gap-4 overflow-hidden border border-black/35">
                    <div className="absolute top-0 block h-[1px] left-0 right-0 w-[70%] bg-secondary10/35 mx-auto"></div>
                    {/* Glow Background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(255,200,0,0.08),transparent_60%)]"></div>

                    {/* Icon */}
                    <div className="z-10 text-white">
                      <Icon size={22} />
                    </div>

                    {/* Text */}
                    <p className="z-10 text-primary font-medium text-xl">
                      {item.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="bg-[#18191D59] px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <h2 className="text-primary text-2xl font-semibold mb-8">FAQs</h2>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {faq.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="grid grid-cols-3 relative rounded-xl p-[1px] bg-black/35 hover:scale-[1.03] transition-all duration-300"
                >
                  {/* Card */}
                  <div className="relative bg-[#0f172a] rounded-xl px-5 py-8 flex flex-col items-center gap-4 overflow-hidden border border-black/35">
                    <div className="absolute top-0 block h-[1px] left-0 right-0 w-[70%] bg-secondary10/35 mx-auto"></div>
                    {/* Glow Background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(255,200,0,0.08),transparent_60%)]"></div>

                    {/* Text */}
                    <p className="z-10 text-primary font-medium text-xl">
                      {item.title}
                    </p>
                    <div className="w-full h-[0.5px] bg-black"></div>
                    <p className="z-10 text-primary font-medium text-xl">
                      {item.title_1}
                    </p>
                    <p className="z-10 text-secondary10 font-medium text-xl">
                      {item.tiltle_content_1}
                    </p>
                    <p className="z-10 text-primary font-medium text-xl">
                      {item.title_2}
                    </p>
                    <p className="z-10 text-secondary10 font-medium text-xl">
                      {item.title_content_2}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SupportPage;
