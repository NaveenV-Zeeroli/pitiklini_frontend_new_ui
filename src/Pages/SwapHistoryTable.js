import React, { useEffect } from "react";
import Header from "./Header";
import { stakeOpt } from "../utils/mockData2";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Side_bar from "./Side_bar";
import AssetListTable from "./AssetListTable";
import HistoryListTable from "./HistoryListTable";
import { getMethod, postMethod } from "../core/service/common.api";
import apiService from "../core/service/detail";
import { Link, useNavigate } from "react-router-dom";
import useState from "react-usestateref";
import { toast } from "react-toastify";
import { Bars } from "react-loader-spinner";
import moment from "moment";
import { useTranslation } from "react-i18next";

const SwapHistoryTable = () => {
  const { t } = useTranslation();
  const [swapHistory, setswapHistory] = useState([]);
  const [totalPage, setTotalpages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [siteLoader, setSiteLoader] = useState(false);

  useEffect(() => {
    swaphistory(1);
  }, [0]);

  const swaphistory = async (page) => {
    try {
      var payload = {
        perpage: 5,
        page: page,
      };
      var data = {
        apiUrl: apiService.swappingHistory,
        payload: payload,
      };
      setSiteLoader(true);
      var resp = await postMethod(data);
      setSiteLoader(false);
      if (resp.status) {
        setswapHistory(resp.data.data);
        setTotalpages(resp.data.total);
      }
    } catch (error) {}
  };

  const recordPerPage = 5;

  const handlePageChange = (event, pageNumber) => {
    swaphistory(pageNumber);
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <section>
        <Header />
      </section>
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
        <main className="dashboard_main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-2 padlef_0_col">
                <Side_bar />
              </div>

              <div className="col-lg-10 padin_lefrig_dash">
                <section className="asset_section">
                  <div className="row">
                    <div className="buy_head">
                      <div className="Buycrypto_title">{t('history')}</div>
                      <ul className="history-lists">
                        <Link to="/loginHistory" className="history-links">
                        {t('login')}
                        </Link>
                        {/* <Link to="/referralHistory" className="history-links">
                                                  Referral
                                                </Link> */}
                        <Link to="/depositHistory" className="history-links">
                        {t('deposit')}
                        </Link>
                        <Link to="/withdrawHistory" className="history-links">
                        {t('withdraw')}
                        </Link>
                        <Link
                          to="/internaltransferhistory"
                          className="history-links"
                        >
                           {t('internalTransfer')}
                        </Link>
                        <Link
                          to="/swapHistory"
                          className="history-links active"
                        >
                           {t('convert')}
                        </Link>
                        {/* <Link to="/stakingHistory" className="history-links">
                                                  Staking
                                                </Link> */}
                        <Link to="/orderHistory" className="history-links">
                        {t('openOrder')}
                        </Link>
                        <Link
                          to="/cancelorderHistory"
                          className="history-links"
                        >
                           {t('closeOrder')}
                        </Link>
                        <Link to="/tradeHistory" className="history-links">
                        {t('trade')}
                        </Link>
                       <Link to="/notificationHistory" className="history-links">
                        {t('notification')}
                      </Link>
                        {/* <Link to="/rewardsHistory" className="history-links">
                                                  Rewards
                                                </Link> */}

                        {/* <Link to="/stoporderHistory" className="history-links">
                          Stop Order
                        </Link> */}
                      </ul>
                      {/* <AssetListTable /> */}
                      {/* <HistoryListTable /> */}

                      <div className="w-full">

  <div className="bg-black rounded-xl p-4">

    {/* Header */}
    <div className="flex items-center bg-gray rounded-lg px-4 py-3 text-primary text-sm">
      <div className="w-12">S.No</div>
      <div className="flex-1 text-center">{t('dte_Time')}</div>
      <div className="flex-1 text-center">{t('fromCurrency')}</div>
      <div className="flex-1 text-center">{t('tocurrency')}</div>
      <div className="flex-1 text-center">{t('amount')}</div>
      <div className="flex-1 text-center">{t('received')}</div>
      <div className="flex-1 text-center">{t('price')}</div>
      <div className="flex-1 text-center">{t('totalAmount')}</div>
      <div className="flex-1 text-center">{t('fee')}</div>
    </div>

    {/* Body */}
    <div className="mt-3 flex flex-col gap-3">
      {swapHistory && swapHistory.length > 0 ? (
        swapHistory.map((item, i) => (
          <div
            key={i}
            className="flex items-center bg-black border border-gray rounded-lg px-4 py-4 hover:bg-gray transition"
          >

            {/* S.No */}
            <div className="w-12 text-secondary text-sm">
              {i + 1}
            </div>

            {/* Date */}
            <div className="flex-1 text-center text-secondary text-sm">
              {moment(item.createdDate).format("lll")}
            </div>

            {/* From Currency */}
            <div className="flex-1 text-center text-secondary text-sm">
              {item.fromCurrency}
            </div>

            {/* To Currency */}
            <div className="flex-1 text-center text-secondary text-sm">
              {item.toCurrency}
            </div>

            {/* Amount */}
            <div className="flex-1 text-center text-secondary text-sm">
              {parseFloat(item.amount).toFixed(4)} {item.fromCurrency}
            </div>

            {/* Received */}
            <div className="flex-1 text-center text-secondary text-sm">
              {parseFloat(item.receivedAmount).toFixed(4)} {item.toCurrency}
            </div>

            {/* Price */}
            <div className="flex-1 text-center text-secondary text-sm">
              {parseFloat(item.price).toFixed(4)} {item.toCurrency}
            </div>

            {/* Total */}
            <div className="flex-1 text-center text-secondary text-sm">
              {parseFloat(item.totalAmount).toFixed(6)} {item.fromCurrency}
            </div>

            {/* Fee */}
            <div className="flex-1 text-center text-secondary text-sm">
              {parseFloat(item.fee).toFixed(6)} {item.fromCurrency}
            </div>

          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          <img
            src={require("../assets/No-data.webp")}
            className="w-24"
            alt="no data"
          />
          <div className="text-secondary10 mt-3">
            {t('noRecordsFound')}
          </div>
        </div>
      )}
    </div>

    {/* Pagination */}
    {swapHistory && swapHistory.length > 0 && (
      <div className="flex justify-center mt-6">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(totalPage / recordPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            size="small"
           sx={{
  "& .MuiPagination-ul": {
    gap: "6px",
  },

  /* ALL buttons (numbers + arrows) */
  "& .MuiPaginationItem-root": {
    color: "#fff",
    borderRadius: "6px",
    minWidth: "34px",
    height: "34px",
    backgroundColor: "transparent",
    transition: "all 0.2s ease",
  },

  /* HOVER (apply to everything including arrows) */
  "& .MuiPaginationItem-root:hover": {
    backgroundColor: "#BD7F10",
    color: "#000",
  },

  /* SELECTED */
  "& .Mui-selected": {
    backgroundColor: "#BD7F10 !important",
    color: "#000",
    fontWeight: "600",
  },

  /* PREV / NEXT buttons (force same style) */
  "& .MuiPaginationItem-previousNext": {
    borderRadius: "6px",
  },

  /* ICON inside arrows */
  "& .MuiPaginationItem-icon": {
    color: "inherit", // 👈 makes arrow follow text color
  },
}}
          />
        </Stack>
      </div>
    )}

  </div>
</div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default SwapHistoryTable;
