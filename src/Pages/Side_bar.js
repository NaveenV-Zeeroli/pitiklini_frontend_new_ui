import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { t } from "i18next";
import { getMethod } from "../core/service/common.api";
import apiService from "../core/service/detail";
import { removeAuthToken } from "../core/lib/localStorage";
import Avatar from "../assets/svg/avatar.svg"

const Side_bar = () => {
  const [activeLink, setActiveLink] = useState("");
  const [profileData, setprofileData] = useState("");
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname.split("/").pop();
    setActiveLink(path || "dashboard");
    getProfile();

    // Check if sub-links are active to auto-open dropdowns
    const historyLinks = [
      "loginHistory",
      "depositHistory",
      "withdrawHistory",
      "internaltransferhistory",
      "swapHistory",
      "orderHistory",
      "cancelorderHistory",
      "tradeHistory",
      "NotificationHistory"
    ];

    if (historyLinks.includes(path)) setIsHistoryOpen(true);
  }, [location]);

  const getProfile = async () => {
    try {
      var data = {
        apiUrl: apiService.getUserDetails,
      };
      var resp = await getMethod(data);
      if (resp.status === true) {
        setprofileData(resp.Message);
      }
    } catch (error) {
      console.error("Failed to fetch profile in Side_bar", error);
    }
  };

  const isActive = (path) => {
    if (path === "history") {
      return [
        "loginHistory",
        "depositHistory",
        "withdrawHistory",
        "internaltransferhistory",
        "swapHistory",
        "orderHistory",
        "cancelorderHistory",
        "tradeHistory",
        "NotificationHistory"
      ].includes(activeLink);
    }
    return activeLink === path;
  };

  const handleLogout = () => {
    removeAuthToken();
    sessionStorage.clear();
    navigate("/login");
  };

  const menuClass = (path) => `flex items-center gap-3 p-4 h-[56px] rounded-lg transition-all duration-200 ${
    isActive(path)
      ? "bg-[#1C1E24] text-white border-l-4 border-primary shadow-lg"
      : "text-primary hover:bg-[#1C1E24]"
  }`;

  return (
    <div className="w-[244px] h-full bg-[#18191D] rounded-[16px] p-4 flex flex-col shadow-2xl z-20 overflow-y-auto custom-scrollbar">
      {/* 🔝 Top Container - Profile */}
      <div className="flex flex-col gap-6 w-[212px] mx-auto flex-shrink-0">
        <div className="relative flex items-center gap-3 py-2">
          <div className="w-[56px] h-[56px] rounded-full border-2 border-[#23262F] overflow-hidden flex items-center justify-center bg-[#23262F]">
            <img
              src={Avatar}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = require("../assets/icons/profile_dark.webp");
              }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-[12px] text-primary font-ibm">
              <span className="opacity-100">{t("hey")}</span>
              <span role="img" aria-label="wave">👋</span>
            </div>
            <div className="text-[14px] text-[#D6D8E0] font-medium font-ibm">
              {profileData.displayname || "User Name"}
            </div>
          </div>
          <div className="absolute left-[214px] top-[10px] w-6 h-10 bg-[#353945] rounded-[6px] flex items-center justify-center cursor-pointer z-10 shadow-md">
            <i className="ri-arrow-up-s-line rotate-90 text-[#777E90]"></i>
          </div>
        </div>
        <div className="border-t border-[#353945] w-full"></div>
      </div>

      {/* Sidebar Pages - Non-independent Scroll (Parent scrolls instead) */}
      <div className="my-4 flex-shrink-0">
        <div className="flex flex-col gap-1 w-[212px] mx-auto">
          {/* Dashboard */}
          <Link to="/dashboard" className={menuClass("dashboard")}>
            <i className="ri-home-line text-[24px]"></i>
            <span className="text-[16px] font-ibm">{t("dashboard")}</span>
          </Link>

          {/* Security */}
          <Link to="/security" className={menuClass("security")}>
            <i className="ri-shield-check-line text-[24px]"></i>
            <span className="text-[16px] font-ibm">{t("security")}</span>
          </Link>

          {/* Fee Setting */}
          <Link to="/fee-settings" className={menuClass("fee-settings")}>
            <i className="ri-settings-3-line text-[24px]"></i>
            <span className="text-[16px] font-ibm">{t("feeSettings")}</span>
          </Link>

          {/* Identification */}
          <Link to="/kyc" className={menuClass("kyc")}>
            <i className="ri-user-search-line text-[24px]"></i>
            <span className="text-[16px] font-ibm">{t("identification")}</span>
          </Link>

          {/* Fiat Deposit */}
          <Link to="/Checkout" className={menuClass("Checkout")}>
            <i className="ri-bank-card-line text-[24px]"></i>
            <span className="text-[16px] font-ibm">{t("fiat_deposit")}</span>
          </Link>

          {/* Withdrawal */}
          <Link to="/withdraw" className={menuClass("withdraw")}>
            <i className="ri-upload-2-line text-[24px]"></i>
            <span className="text-[16px] font-ibm">{t("withdrawal")}</span>
          </Link>

          {/* Deposit */}
          <Link to="/deposit" className={menuClass("deposit")}>
            <i className="ri-download-2-line text-[24px]"></i>
            <span className="text-[16px] font-ibm">{t("deposit")}</span>
          </Link>

          {/* History Dropdown */}
          <div className="flex flex-col">
            <div
              onClick={() => setIsHistoryOpen(!isHistoryOpen)}
              className={`flex items-center justify-between p-4 h-[56px] rounded-lg cursor-pointer transition-all duration-200 ${
                isActive("history") ? "bg-[#1C1E24] text-white" : "text-primary hover:bg-[#1C1E24]"
              }`}
            >
              <div className="flex items-center gap-3">
                <i className="ri-history-line text-[24px]"></i>
                <span className="text-[16px] font-ibm">{t("history")}</span>
              </div>
              <i className={`ri-arrow-${isHistoryOpen ? 'up' : 'down'}-s-line text-[#777E90]`}></i>
            </div>

            {isHistoryOpen && (
              <div className="flex flex-col pl-10 gap-1 mt-1 pb-2">
                <Link
                  to="/loginHistory"
                  className={`flex items-center p-2 rounded-lg transition-all duration-200 ${
                    activeLink === "loginHistory" ? "text-white font-medium bg-[#23262F]" : "text-primary hover:text-white"
                  }`}
                >
                  <span className="text-[14px] font-ibm">{t("login")}</span>
                </Link>
                <Link
                  to="/tradeHistory"
                  className={`flex items-center p-2 rounded-lg transition-all duration-200 ${
                    activeLink === "tradeHistory" ? "text-white font-medium bg-[#23262F]" : "text-primary hover:text-white"
                  }`}
                >
                  <span className="text-[14px] font-ibm">{t("trade")}</span>
                </Link>
                <Link
                  to="/depositHistory"
                  className={`flex items-center p-2 rounded-lg transition-all duration-200 ${
                    activeLink === "depositHistory" ? "text-white font-medium bg-[#23262F]" : "text-primary hover:text-white"
                  }`}
                >
                  <span className="text-[14px] font-ibm">{t("deposit")}</span>
                </Link>
                <Link
                  to="/withdrawHistory"
                  className={`flex items-center p-2 rounded-lg transition-all duration-200 ${
                    activeLink === "withdrawHistory" ? "text-white font-medium bg-[#23262F]" : "text-primary hover:text-white"
                  }`}
                >
                  <span className="text-[14px] font-ibm">{t("withdraw")}</span>
                </Link>
                <Link
                  to="/internaltransferhistory"
                  className={`flex items-center p-2 rounded-lg transition-all duration-200 ${
                    activeLink === "internaltransferhistory" ? "text-white font-medium bg-[#23262F]" : "text-primary hover:text-white"
                  }`}
                >
                  <span className="text-[14px] font-ibm">{t("internal_transfer")}</span>
                </Link>
                <Link
                  to="/swapHistory"
                  className={`flex items-center p-2 rounded-lg transition-all duration-200 ${
                    activeLink === "swapHistory" ? "text-white font-medium bg-[#23262F]" : "text-primary hover:text-white"
                  }`}
                >
                  <span className="text-[14px] font-ibm">{t("convert")}</span>
                </Link>
                <Link
                  to="/orderHistory"
                  className={`flex items-center p-2 rounded-lg transition-all duration-200 ${
                    activeLink === "orderHistory" ? "text-white font-medium bg-[#23262F]" : "text-primary hover:text-white"
                  }`}
                >
                  <span className="text-[14px] font-ibm">{t("openOrder")}</span>
                </Link>
                <Link
                  to="/cancelorderHistory"
                  className={`flex items-center p-2 rounded-lg transition-all duration-200 ${
                    activeLink === "cancelorderHistory" ? "text-white font-medium bg-[#23262F]" : "text-primary hover:text-white"
                  }`}
                >
                  <span className="text-[14px] font-ibm">{t("closeOrder")}</span>
                </Link>
                <Link
                  to="/NotificationHistory"
                  className={`flex items-center p-2 rounded-lg transition-all duration-200 ${
                    activeLink === "NotificationHistory" ? "text-white font-medium bg-[#23262F]" : "text-primary hover:text-white"
                  }`}
                >
                  <span className="text-[14px] font-ibm">{t("notification")}</span>
                </Link>
              </div>
            )}
          </div>

          {/* Support */}
          <Link to="/support" className={menuClass("support")}>
            <i className="ri-customer-service-2-line text-[24px]"></i>
            <span className="text-[16px] font-ibm">{t("support")}</span>
          </Link>
        </div>
      </div>

      {/* 底部 Container - Fixed height portion */}
      <div className="flex flex-col gap-6 w-[212px] mx-auto pb-4 flex-shrink-0 pt-4 border-t border-[#353945]">
        {/* Divider */}
        <div className="border-t border-[#353945] w-full"></div>

        {/* Quick Access */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-[12px] text-[#777E90] font-ibm">{t("quickAccess")}</span>
            <i className="ri-edit-line text-[16px] text-[#777E90] cursor-pointer"></i>
          </div>
          <div className="bg-[#1C1E24] rounded-lg p-4 flex justify-between items-center px-4">
            <Link to="/NotificationHistory">
              <i className="ri-notification-3-line text-primary text-[20px]"></i>
            </Link>
            <Link to="/security">
              <i className="ri-shield-check-line text-primary text-[20px]"></i>
            </Link>
            <Link to="/dashboard">
              <i className="ri-user-line text-primary text-[20px]"></i>
            </Link>
            <Link to="/support">
              <i className="ri-book-read-line text-primary text-[20px]"></i>
            </Link>
          </div>
        </div>

        {/* Log Out */}
        <div
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 text-primary cursor-pointer hover:opacity-80 transition-all duration-200"
        >
          <i className="ri-logout-box-r-line text-[20px]"></i>
          <span className="text-[14px] font-ibm font-normal">{t("logout")}</span>
        </div>
      </div>
    </div>
  );
};

export default Side_bar;
