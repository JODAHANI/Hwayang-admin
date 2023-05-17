import React, { useEffect, useState } from "react";
import {
  updateProclamation,
  getProclamation,
} from "../../../_actions/user_actions";
import LoadingSpinner from "Components/layout/LoadingSpinner/LoadingSpinner";

const btnCss =
  "bg-[#fff] text-[#005000] py-1 px-3 rounded-lg	text-xs font-bold absolute right-4 top-4";
const submitBtnCss =
  "m-auto bg-[#fff] text-[#005000] py-1 px-3 rounded-lg text-xs font-bold mx-2";
const Proclamation = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [paragraph, setParagraph] = useState("");
  const [message, setMessage] = useState("");
  const [todayLogos, setTodayLogos] = useState("");
  const [todayparagraph, setTodayparagraph] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading((prev) => true);
    getProclamation().then((res) => {
      if (res.payload.success) {
        const { todayLogos, paragraph } = res.payload.logos;
        setTodayLogos(todayLogos);
        setTodayparagraph(paragraph);
        setIsLoading((prev) => false);
      }
    });
  }, []);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleParagraphChange = (event) => {
    setParagraph(event.target.value);
  };

  const formHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = { message: message.trim(), paragraph: paragraph.trim() };

    updateProclamation(data).then((res) => {
      if (res.payload.success) {
        const { todayLogos } = res.payload.logos;
        setTodayLogos(todayLogos);
        setTodayparagraph(paragraph);
      }
    });

    setMessage("");
    setIsEdit((prev) => !prev);
  };

  const buttonHandler = (event: React.MouseEvent) => {
    setIsEdit((prev) => !prev);
  };

  return (
    <div className="section-screen bg-[#FFAC1C] max-w-7xl flex justify-center m-auto text-[#fff]">
      <div className="w-full relative left-0 top-0">
        <h2 className="logos text-center py-10 font-extrabold text-2xl max-sm:text-lg text-[#005000]">
          오늘의 선포 말씀
        </h2>
        {!isEdit && (
          <button type="button" onClick={buttonHandler} className={btnCss}>
            수정
          </button>
        )}
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <>
            <h4 className="text-center font-semibold py-3">
              「 {todayparagraph} 」
            </h4>
            <h3 className="text-center font-semibold py-3">{todayLogos}</h3>
          </>
        )}
        {isEdit && (
          <>
            <form onSubmit={formHandler} className="text-center ">
              <div className="my-4 ">
                <input
                  onChange={handleParagraphChange}
                  placeholder="말씀구절"
                  className="p-5 text-[#222] bg-[#FEF3DA] shadow-xl font-xs w-10/12 h-10 max-sm:w-11/12 focus:outline-none focus:shadow-outline text-center rounded-3xl"
                />
              </div>
              <div className="my-4 ">
                <textarea
                  onChange={handleMessageChange}
                  className="p-5 text-[#222] bg-[#FEF3DA] shadow-xl font-xs w-10/12 h-48 max-sm:w-11/12 focus:outline-none focus:shadow-outline text-center rounded-3xl"
                />
              </div>

              <button type="submit" className={submitBtnCss}>
                수정
              </button>
              <button
                type="button"
                onClick={buttonHandler}
                className={submitBtnCss}
              >
                닫기
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Proclamation;
