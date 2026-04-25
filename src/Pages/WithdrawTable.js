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
import Moment from "moment";
import { useTranslation } from "react-i18next";

const WithdrawTable = () => {
  const [withdrawHistory, setwithdrawHistory] = useState([]);
  const [siteLoader, setSiteLoader] = useState(false);

  const [withdrawcurrentpage, setwithdrawcurrentpage] = useState(1);
  const [withdrawtotalpage, setwithdrawTotalpages] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    getwithdrawHistory(1);
  }, [0]);

  const getwithdrawHistory = async (page) => {
    var data = {
      apiUrl: apiService.withdraw_history,
      payload: { FilPerpage: 5, FilPage: page },
    };
    setSiteLoader(true);
    var withdraw_history_list = await postMethod(data);
    setSiteLoader(false);
    if (withdraw_history_list) {
      console.log(
        withdraw_history_list,
        "--- withdraw_history_list--",
        withdraw_history_list.result,
        withdraw_history_list.pages
      );
      setwithdrawHistory(withdraw_history_list.result);
      setwithdrawTotalpages(withdraw_history_list.pages);
    }
  };

  const withdrawrecordpage = 5;
  const withdrawpagerange = 5;

  const handlepagewithdraw = (event, page) => {
    getwithdrawHistory(page);
    setwithdrawcurrentpage(page);
  };

  const copy = async (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Address copied");
  };

  return (
    <>
      <section>
        <Header />
      </section>
      {siteLoader == true ? (
        <div className="flex justify-center items-center h-[calc(100vh-100px)]">
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
        <main className="bg-[#13151b] min-h-screen text-white font-sans">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-2 padlef_0_col">
                <Side_bar />
              </div>

              <div className="col-lg-10 padin_lefrig_dash pt-6">
                <section className="asset_section max-w-[1400px] mx-auto pb-12">
                  <div className="buy_head mb-8">
                    <h1 className="Buycrypto_title text-[#bd7f10] text-2xl font-medium m-0 p-0 border-0">{t('Withdraw History')}</h1>
                  </div>

                  {/* Filters Bar */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex bg-[#1a1c22] rounded-md px-4 py-2 items-center space-x-4 border border-[#23252a]">
                      <div className="flex items-center">
                        <input
                          type="date"
                          className="bg-transparent text-sm text-[#bd7f10] outline-none border-none cursor-pointer color-scheme-dark"
                        />
                      </div>
                      <span className="text-[#45484f]">—</span>
                      <div className="flex items-center">
                        <input
                          type="date"
                          className="bg-transparent text-sm text-[#bd7f10] outline-none border-none cursor-pointer color-scheme-dark"
                        />
                      </div>
                      <div className="w-[1px] h-6 bg-[#45484f]"></div>
                      <div className="flex items-center relative">
                        <select className="bg-transparent text-sm text-[#bd7f10] outline-none border-none cursor-pointer appearance-none pr-6">
                          <option value="">Coins</option>
                          <option value="BTC" className="bg-[#1a1c22]">BTC</option>
                          <option value="ETH" className="bg-[#1a1c22]">ETH</option>
                          <option value="USDT" className="bg-[#1a1c22]">USDT</option>
                        </select>
                        <span className="text-[#bd7f10] text-[10px] absolute right-0 pointer-events-none">▼</span>
                      </div>
                    </div>

                    <button className="bg-[#bd7f10] hover:bg-[#9e690c] text-white px-6 py-2.5 rounded-md font-semibold flex items-center transition-colors shadow-lg">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mr-2">
                        <path d="M14 2H6C4.895 2 4 2.895 4 4V20C4 21.105 4.895 22 6 22H18C19.105 22 20 21.105 20 20V8L14 2ZM17 20H7V4H13V9H18V20ZM12 11V18L9 15L10.4 13.6L12 15.2L13.6 13.6L15 15L12 11Z" fill="currentColor" />
                      </svg>
                      Export
                    </button>
                  </div>

                  {/* Enhanced Table */}
                  <div className="bg-[#1a1c22] rounded-lg border border-[#2a2d34] overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                          <tr className="bg-[#1e2025] text-[#bd7f10] text-[13px] border-b border-[#bd7f10]">
                            <th className="px-6 py-4 font-normal">Date/Time</th>
                            <th className="px-6 py-4 font-normal">Coin</th>
                            <th className="px-6 py-4 font-normal">Amount</th>
                            <th className="px-6 py-4 font-normal">Withdraw to</th>
                            <th className="px-6 py-4 font-normal">Blockchain Record</th>
                            <th className="px-6 py-4 font-normal">Remarks</th>
                            <th className="px-6 py-4 font-normal text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#23252a]">
                          {withdrawHistory.length > 0 ? (
                            withdrawHistory.map((data, i) => (
                              <tr key={i} className="hover:bg-[#202228] transition-colors text-[14px] text-gray-200">
                                <td className="px-6 py-5">
                                  {Moment(data.created_at).format("DD/MM/YY - HH:mm:ss")}
                                </td>
                                <td className="px-6 py-5">
                                  <div className="font-medium text-white">{data.currency}</div>
                                  <div className="text-[11px] text-[#8c9199] mt-0.5">Bitcoin</div>
                                </td>
                                <td className="px-6 py-5">
                                  {data.amount == undefined ? "0" : data.amount.toFixed(4)}
                                </td>
                                <td className="px-6 py-5">
                                  <div className="flex items-center group">
                                    <svg onClick={() => copy(data.to_address || "0x412313...hbdu12rex")} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-[#8c9199] group-hover:text-white cursor-pointer transition-colors">
                                      <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="currentColor" />
                                    </svg>
                                    <span className="text-gray-300">
                                      {data.to_address ? (data.to_address.length > 20 ? data.to_address.slice(0, 8) + "..." + data.to_address.slice(-8) : data.to_address) : "0x412313...hbdu12rex"}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-5">
                                  <div className="flex items-center group">
                                    <svg onClick={() => copy(data.txn_id)} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-[#8c9199] group-hover:text-white cursor-pointer transition-colors">
                                      <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="currentColor" />
                                    </svg>
                                    <span className="text-gray-300">
                                      {data.txn_id && data.txn_id !== "--------" ? (data.txn_id.length > 20 ? data.txn_id.slice(0, 8) + "..." + data.txn_id.slice(-8) : data.txn_id) : "16asfzv6...hbdu12rex"}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-5 text-[#8c9199]">
                                  -
                                </td>
                                <td className="px-6 py-5 text-center">
                                  <button className="border border-[#3a3d45] rounded-[4px] px-4 py-1.5 text-[12px] text-gray-300 hover:bg-[#2a2d34] hover:text-white hover:border-[#4a4d55] transition-all">
                                    Details
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={7} className="text-center py-16">
                                <div className="flex flex-col items-center justify-center">
                                  <img
                                    src={require("../assets/No-data.webp")}
                                    width="100"
                                    alt="No data"
                                    className="opacity-40 mb-4"
                                  />
                                  <div className="text-[#8c9199] text-base">{t('noRecordsFound')}</div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    {/* Pagination Context */}
                    {withdrawHistory && withdrawHistory.length > 0 && (
                      <div className="p-5 border-t border-[#23252a] flex justify-center">
                        <Stack spacing={2}>
                          <Pagination
                            count={Math.ceil(withdrawtotalpage)}
                            page={withdrawcurrentpage}
                            onChange={handlepagewithdraw}
                            shape="rounded"
                            sx={{
                              "& .MuiPaginationItem-root": {
                                color: "#8c9199",
                                borderColor: "#2a2d34",
                              },
                              "& .Mui-selected": {
                                backgroundColor: "#bd7f10 !important",
                                color: "#13151b !important",
                                fontWeight: "bold",
                                "&:hover": {
                                  backgroundColor: "#9e690c !important",
                                },
                              },
                              "& .MuiPaginationItem-icon": {
                                color: "#8c9199",
                              },
                            }}
                          />
                        </Stack>
                      </div>
                    )}
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

export default WithdrawTable;
