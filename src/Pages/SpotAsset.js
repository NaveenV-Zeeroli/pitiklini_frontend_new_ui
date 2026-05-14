import React, { useEffect } from "react";
import useState from "react-usestateref";
import Header from "./Header";
import { stakeOpt } from "../utils/mockData2";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Side_bar from "./Side_bar";
import { getMethod, postMethod } from "../core/service/common.api";
import apiService from "../core/service/detail";
import { Link, useNavigate } from "react-router-dom";
// import useState from "react-usestateref";
import { toast } from "react-toastify";
import { Bars } from "react-loader-spinner";
import Moment from "moment";
import AssetListTable from "./AssetListTable";
import WalletViewTable from "./WalletViewTable";
import Select from "react-select";
import { t } from "i18next";
import DashboardLayout from "./DashboardLayout";

const colourStyles = {
  option: (styles, { isDisabled, isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isFocused ? "#222327" : "#222327",
    color: isFocused ? "#ffc630" : "#fff",
    cursor: isDisabled ? "not-allowed" : "pointer",
    borderBottom: `1px solid ${isFocused ? "#ffc630" : "#17171a"}`,
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
  }),
};

const Assets = () => {
  const cryptOptions = [
    { value: "BTC", label: "BTC" },
    { value: "INR", label: "INR" },
    { value: "USDT", label: "USDT" },
    { value: "USD", label: "USD" },
  ];

  useEffect(() => {
    // getDefault("USDT");
    getUserTotalbalance(currentPage);
    getUserbalance(currentPage);
  }, [0]);

  const [overallValue, setoverallValue] = useState(0);
  const [coinviewValue, setcoinviewValue] = useState({});
  const [walletviewValue, setwalletviewValue] = useState([]);
  const [perpage, setperpage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setsearch, searchref] = useState("");
  const [totalAllbalance, setTotalAllbalance] = useState(0);
  const [totalAllbalanceINR, setTotalAllbalanceINR] = useState(0);
  const [siteLoader, setSiteLoader] = useState(false);
  const [AvailablePrice, setAvailablePrice] = useState(0);
  const [inorderPrice, setinorderPrice] = useState(0);

  const [isBalanceVisible, setIsBalanceVisible, isBalanceVisibleref] =
    useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [availableSpot, setavailableSpot] = useState(0);
  const [inorderSpot, setinorderSpot] = useState(0);
  const [totalSpot, settotalSpot] = useState(0);
  const [totalSpotINR, settotalSpotINR] = useState(0);
  const [availableFunding, setavailableFunding] = useState(0);
  const [inorderFunding, setinorderFunding] = useState(0);
  const [totalFunding, settotalFunding] = useState(0);
  const [totalFundingINR, settotalFundingINR] = useState(0);
  const [balanceDatas, setbalanceDatas] = useState([]);
  const [balanceDetails, setbalanceDetails] = useState([]);
  const [total, settotal] = useState(0);
  const recordPerPage = 5;

  const onSelect_currency = async (e, option) => {
    let selectedCurrency = e.label;
    getDefault(selectedCurrency);
  };

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prev) => !prev);
  };

  const handlePageChange = (event, value) => {
    console.log(value, "ujbjjnjn");

    setCurrentPage(value);
    var current_page = +value * 5;
    var prev_page = +current_page - 5;
    var resp_balance = [];
    for (var i = prev_page; i < current_page; i++) {
      if (balanceDatas[i] !== undefined) {
        resp_balance.push(balanceDatas[i]);
      }
    }
    setbalanceDetails(resp_balance);
  };

  const getDefault = async (data) => {
    try {
      var obj = {
        currency: data,
      };
      console.log(obj, "obj");
      var data = {
        apiUrl: apiService.balanceOverallBalance,
        payload: obj,
      };
      const response = await postMethod(data);
      console.log(response, "=-=-=response=-=-=-response-=-=-");
      if (response.status == true) {
        console.log(response.coinView, "coinViewcoinViewcoinView");
        console.log(response.overallValue, "responseresponseresponse");
        console.log(response.walletView, "walletViewwalletViewwalletView");
        setoverallValue(response.overallValue.value.toFixed(8));
        setcoinviewValue(response.coinView);
        setwalletviewValue(response.walletView);
      } else {
      }
    } catch (error) {}
  };

  const getUserTotalbalance = async (pages) => {
    var obj = {
      perpage: perpage,
      page: pages,
      search: searchref.current,
    };
    var data = {
      apiUrl: apiService.getUserTotalbalanceAll,
      payload: obj,
    };
    setSiteLoader(true);
    var resp = await postMethod(data);
    setSiteLoader(false);
    console.log(resp, "----=--=-=-=resp-=-=-=-=");
    if (resp.status == true) {
      var balanceData = resp.balance;
      setTotalAllbalance(balanceData.total_balance_new);
      setTotalAllbalanceINR(balanceData.total_balance_inr);
      setavailableSpot(balanceData.available_balance);
      setinorderSpot(balanceData.inorder_balance);
      settotalSpot(balanceData.total_balance_spot);
      setavailableFunding(balanceData.available_balance_funding);
      setinorderFunding(balanceData.inorder_balance_funding);
      settotalFunding(balanceData.total_balance_funding);
      settotalSpotINR(balanceData.total_spot_balance_inr);
      settotalFundingINR(balanceData.total_funding_balance_inr);
    }
  };

  const getUserbalance = async (pages) => {
    // setSiteLoader(false);
    var obj = {
      perpage: perpage,
      page: pages,
      search: searchref.current,
    };

    var data = {
      apiUrl: apiService.getUserBalance,
      payload: obj,
    };
    // setSiteLoader(true);
    var resp = await postMethod(data);
    // setSiteLoader(false);

    if (resp.status == true) {
      // setSiteLoader(false);
      console.log(resp.Message, "=-=-=-resp.Message=-=-=-");
      var balanceData = resp.Message;
      setbalanceDatas(balanceData);

      var current_page = +resp.current * 5;
      var prev_page = +current_page - 5;
      var resp_balance = [];
      for (var i = prev_page; i < current_page; i++) {
        if (balanceData[i] !== undefined) {
          resp_balance.push(balanceData[i]);
        }
      }
      // resp_balance = resp_balance.filter(Boolean);
      setbalanceDetails(resp_balance);
      var totalnumber = resp.total;
      settotal(resp.total);
      // console.log(resp.total, "resp.totalresp.total");
      var balanceData = resp.balance;
    } else {
    }
  };

  const hide = async (e, ption) => {};

  const navigate = useNavigate();

  const depositNav = () => {
    navigate("/deposit");
  };

  const stakeNav = () => {
    navigate("/staking");
  };

  return (
    <>
      <DashboardLayout>
        {siteLoader == true ? (
          <div className="loadercss">
            <Bars
              height="80"
              width="80"
              color="#bd7f10"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <section className="asset_section w-full min-w-0 max-w-full overflow-x-hidden px-3 sm:px-4 md:px-0 max-sm:pt-20">
            <div className="buy_head w-full min-w-0 max-w-full">
              <div className="asset_title w-full min-w-0 max-w-full">{t("spotAssets")}</div>
              <div className="col-lg-12 w-full min-w-0 max-w-full">
                {/* Estimated Value */}
                <div className="esti-container max-sm:!p-4">
                  <div className="esti-sub-container max-lg:!flex-col max-lg:!items-stretch max-lg:!justify-start max-lg:gap-4 lg:!flex-row lg:!items-center lg:!justify-between">
                    <div className="esti-left min-w-0 max-w-full">
                      <span className="esti-title">
                        {t("spot-balance")}
                        <span
                          onClick={toggleBalanceVisibility}
                          className="mx-2 eye-icon"
                        >
                          {isBalanceVisible ? (
                            <i class="fa-regular fa-eye ass_eye"></i>
                          ) : (
                            <i class="fa-regular fa-eye-slash ass_eye"></i>
                          )}
                        </span>
                      </span>
                      <span className="esti-usdt">
                        {/* {overallValue} */}
                        {isBalanceVisible ? (
                          <>
                            {totalSpot == "" ||
                            totalSpot == null ||
                            totalSpot == undefined
                              ? 0.0
                              : totalSpot.toFixed(4)}{" "}
                          </>
                        ) : (
                          "****"
                        )}
                        <span className="esti-span ">
                          USDT
                          {/* <Select
                                options={cryptOptions}
                                placeholder="USDT"
                                className="esti-span"
                                styles={colourStyles}
                                onChange={onSelect_currency}
                              /> */}
                        </span>{" "}
                      </span>
                      <span className="esti-num">
                        ~{" "}
                        {isBalanceVisible ? (
                          <>
                            {totalSpotINR == "" ||
                            totalSpotINR == null ||
                            totalSpotINR == undefined
                              ? 0.0
                              : totalSpotINR.toFixed(4)}
                          </>
                        ) : (
                          "****"
                        )}{" "}
                        INR
                      </span>
                    </div>
                    <div className="dash-bal-btns-wrapper w-full shrink-0 max-lg:flex-col max-lg:gap-3 max-lg:[&>a]:block max-lg:[&>a]:w-full max-lg:[&_button]:w-full lg:w-auto lg:flex-row">
                      <Link to="/deposit" className="max-lg:block max-lg:w-full">
                        <button className="dash-bal-btn max-lg:!w-full">{t("deposit")}</button>
                      </Link>
                      <Link to="/withdraw" className="max-lg:block max-lg:w-full">
                        <button className="dash-bal-btn max-lg:!w-full">
                          {t("withdrawal")}
                        </button>
                      </Link>
                      {/* <Link to="/internaltransfer">
                              <button className="dash-bal-btn">Transfer</button>
                            </Link> */}
                    </div>
                  </div>
                </div>
                {/* <div
                        class="nav nav-tabs asset-nav-tabs"
                        id="nav-tab"
                        role="tablist"
                      >
                        <button
                          class="nav-link active"
                          id="nav-home-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-home"
                          type="button"
                          role="tab"
                          aria-controls="nav-home"
                          aria-selected="true"
                        >
                          Wallet View
                        </button>
                        <button
                          class="nav-link "
                          id="nav-orders-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-orders"
                          type="button"
                          role="tab"
                          aria-controls="nav-orders"
                          aria-selected="false"
                        >
                          Spot
                        </button>
                        <button
                          class="nav-link "
                          id="nav-funding-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-funding"
                          type="button"
                          role="tab"
                          aria-controls="nav-funding"
                          aria-selected="false"
                        >
                          Funding
                        </button>
                      </div> */}

                <div className="terms mb-3 flex max-w-full flex-wrap items-center gap-2 px-0 sm:justify-end">
                  <div class="checkbox-container shrink-0">
                    <input
                      id="custom-checkbox"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      className="input-field regular_checkbox"
                      type="checkbox"
                    />
                    <label htmlFor="custom-checkbox"></label>
                  </div>
                  <label htmlFor="custom-checkbox" className="terms-check min-w-0 flex-1 text-sm leading-snug sm:flex-none sm:text-[inherit]">
                    {t("hidesmallbalances")}
                  </label>
                </div>

                <div class="tab-content w-full min-w-0 max-w-full" id="nav-tabContent">
                  {/* <div
                          class="tab-pane fade mt-4"
                          id="nav-orders"
                          role="tabpanel"
                          aria-labelledby="nav-orders-tab"
                          tabindex="0"
                        > */}
                  <div className="table-responsive table-cont min-w-0 max-w-full overflow-x-auto">
                    <table className="table min-w-0">
                      <thead>
                        <tr className="stake-head-assss ">
                          <th className="align-middle">{t("assets")}</th>
                          <th className="opt-nowrap txt-center pad-left-23 pad-l-100 min-w-[6.5rem] px-2 md:min-w-[7.5rem] md:px-4 lg:px-5">
                            {t("onOrders")}
                          </th>
                          <th className="opt-nowrap txt-center pad-left-23 pad-l-100 min-w-[8.5rem] px-3 md:min-w-[10rem] md:px-6 lg:px-10">
                            {t("availablebalance")}
                          </th>
                          <th className="opt-btn-flex table-action p-r-25 min-w-[8.5rem] px-3 text-center md:min-w-[10rem] md:pl-8 md:pr-8 lg:pl-12 lg:pr-10">
                            {t("totalBalance")}
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {balanceDetails && balanceDetails.length > 0 ? (
                          balanceDetails
                            .filter(
                              (item) => !isChecked || item.currencyBalance > 0,
                            )
                            .map((item, i) => {
                              return (
                                <tr key={i}>
                                  <td className="table-flex">
                                    <img src={item?.currencyImage} alt="" />
                                    <div className="table-opt-name">
                                      <h4 className="opt-name  font_14">
                                        {item?.currencysymbol}
                                      </h4>
                                      <h3 className="opt-sub font-satoshi font_14">
                                        {item?.currencyName}
                                      </h3>
                                    </div>
                                  </td>

                                  <td className="opt-term  font_14 table_center_text pad-left-23 pad-l-100 nowra_txt min-w-[6.5rem] px-2 md:min-w-[7.5rem] md:px-4 lg:px-5">
                                    {isBalanceVisible ? (
                                      <>
                                        {parseFloat(item?.holdAmount).toFixed(
                                          4,
                                        )}
                                      </>
                                    ) : (
                                      " ****"
                                    )}{" "}
                                    {item?.currencysymbol}
                                  </td>
                                  <td className="opt-term  font_14 table_center_text pad-left-23 pad-l-100 nowra_txt min-w-[8.5rem] px-3 md:min-w-[10rem] md:px-6 lg:px-10">
                                    {isBalanceVisible ? (
                                      <>
                                        {parseFloat(
                                          item?.currencyBalance,
                                        ).toFixed(4)}
                                      </>
                                    ) : (
                                      "****"
                                    )}{" "}
                                    {item?.currencysymbol}
                                  </td>
                                  <td className="opt-term  font_14 pad-left-23 assnewch_lasttd nowra_txt min-w-[8.5rem] px-3 text-center md:min-w-[10rem] md:pl-8 md:pr-8 lg:pl-12 lg:pr-10">
                                    {isBalanceVisible ? (
                                      <>
                                        {parseFloat(
                                          item?.currencyBalance +
                                            parseFloat(item?.holdAmount),
                                        ).toFixed(4)}
                                      </>
                                    ) : (
                                      "****"
                                    )}{" "}
                                    {item?.currencysymbol}{" "}
                                  </td>
                                </tr>
                              );
                            })
                        ) : (
                          <tr>
                            <td colSpan={4} className="text-center py-5">
                              <div className="empty_data">
                                <div className="empty_data_img">
                                  <img
                                    src={require("../assets/No-data.webp")}
                                    width="100px"
                                  />
                                </div>
                                <div className="no_records_text">
                                  {t("noRecordsFound")}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    {balanceDetails && balanceDetails.length > 0 ? (
                      <div className="mx-auto my-4 flex max-w-full justify-center overflow-x-auto px-1">
                        <Stack spacing={2}>
                          <Pagination
                            count={Math.ceil(total / recordPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            size="small"
                            sx={{
                              "& .MuiPagination-ul": { gap: "6px" },
                              "& .MuiPaginationItem-root": {
                                color: "#fff",
                                borderRadius: "6px",
                                minWidth: "34px",
                                height: "34px",
                              },
                              "& .MuiPaginationItem-root:hover": {
                                backgroundColor: "#BD7F10",
                                color: "#000",
                              },
                              "& .Mui-selected": {
                                backgroundColor: "#BD7F10 !important",
                                color: "#000",
                                fontWeight: "600",
                              },
                              "& .MuiPaginationItem-icon": {
                                color: "inherit",
                              },
                            }}
                            // renderItem={(item) => (
                            //   <PaginationItem
                            //     slots={{
                            //       previous: ArrowBackIcon,
                            //       next: ArrowForwardIcon,
                            //     }}
                            //     {...item}
                            //   />
                            // )}
                          />
                        </Stack>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </div>
          </section>
        )}
      </DashboardLayout>
    </>
  );
};

export default Assets;
