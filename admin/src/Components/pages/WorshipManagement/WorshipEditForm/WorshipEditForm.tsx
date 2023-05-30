import React, { useState } from "react";
import { editWorship, imageSave } from "_actions/worship_action";
import { useDispatch } from "react-redux";

const inputLabelCss =
  "px-3 py-2 rounded-md shadow bg-[#f0f0f0] w-full border border-[#ccc] focus:bg-[#fff] focus:outline-cyan-500 max-sm:p-1 max-sm:px-3 text-[#454B1B] hover:cursor-pointer placeholder:text-[#999]";
const btnCss =
  "bg-[#3ed1fe] text-[#fff] rounded-xl py-2 w-6/12 m-auto font-black border border-[#3ed1fe] text-md block";
const labelInputCss =
  "px-3 py-2 rounded-md block shadow bg-[#f0f0f0] w-full border-[#ccc] text-[#454B1B] leading-tight focus:outline-cyan-500 max-sm:p-1 max-sm:px-3 hover:cursor-pointer";

const labelCss = "block font-bold mb-2";

const WorshipEditForm = ({ offShowForm, item }) => {
  const dispatch: any = useDispatch();
  const [title, setTitle] = useState(item.title);
  const [limit, setLimit] = useState(item.limit);
  const [speaker, setSpeaker] = useState(item.speaker);
  const [date, setDate] = useState(item.date);
  const [time, setTime] = useState(item.time);
  const [openDate, setOpenDate] = useState(item.openDate);
  const [openTime, setOpenTime] = useState(item.openTime);
  const [parti, setParti] = useState(item.parti);

  const [isError, setIsError] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const [imageFileName, setImageFileName] = useState("사진을 선택해주세요.");
  const [errMessage, setErrMessage] = useState("");

  const formErrorCheck = () => {
    if (title.length <= 1) {
      setIsError(true);
      setErrMessage("예배 타이틀을 입력해주세요.");
      return false;
    }
    if (speaker.length <= 1) {
      setIsError(true);
      setErrMessage("설교자를 입력해주세요.");
      return false;
    }
    if (!date.length) {
      setIsError(true);
      setErrMessage("날짜를 선택해주세요.");
      return false;
    }
    if (!time.length) {
      setIsError(true);
      setErrMessage("시간을 선택해주세요.");
      return false;
    }
    if (!openDate.length) {
      setIsError(true);
      setErrMessage("오픈날짜를 선택해주세요.");
      return false;
    }

    if (!openTime.length) {
      setIsError(true);
      setErrMessage("오픈시간을 선택해주세요.");
      return false;
    }
    if (!imageFile) {
      setIsError(true);
      setErrMessage("설교자 사진을 업로드해주세요.");
      return false;
    }

    return true;
  };

  const titleHanlder = (event) => {
    setTitle(event.target.value);
  };

  const speakerHanlder = (event) => {
    setSpeaker(event.target.value);
  };
  const dateHanlder = (event) => {
    setDate(event.target.value);
  };
  const timeHanlder = (event) => {
    setTime(event.target.value);
  };
  const openDateHanlder = (event) => {
    setOpenDate(event.target.value);
  };
  const openTimeHanlder = (event) => {
    setOpenTime(event.target.value);
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();
    const checkError = formErrorCheck();
    if (!checkError) {
      return;
    }
    setIsError((prev) => false);
    let formData = new FormData();
    formData.append("file", imageFile);
    const config: object = {
      header: { "content-type": "multipart/form-data" },
    };
    const body = {
      id: item._id,
      title: title,
      speaker: speaker,
      date: date,
      time: time,
      openDate: openDate,
      openTime: openTime,
    };

    const requestImageSave = await imageSave(formData, config);
    if (requestImageSave.payload.success) {
      const requestDispatch = await dispatch(editWorship(body));
      if (requestDispatch.payload.success) {
        offShowForm();
      }
    }
  };

  const imageChangeHandler = (event) => {
    let file = event.target.files[0];
    file["path"] = file.name;
    setImageFile(file);
    setImageFileName(file.name);
  };

  return (
    <div className="p-5 m-auto shadow-md bg-white rounded-lg w-5/6 mb-8 border">
      {isError && (
        <p className="text-[crimson] pb-2 text-sm font-bold">
          오류 : {errMessage}
        </p>
      )}
      <form onSubmit={submitFormHandler} className="relative">
        <div className="mb-4">
          <label htmlFor="title" className={labelCss}>
            - 예배명
          </label>
          <input
            className={inputLabelCss}
            placeholder="ex: 5월 15일 수요예배"
            type="text"
            id="title"
            value={title}
            onChange={titleHanlder}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="limit" className={labelCss}>
            - 제한인원
          </label>
          <input
            className={inputLabelCss}
            placeholder="ex: 200"
            type="number"
            id="limit"
            value={limit}
            onChange={titleHanlder}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="speaker" className={labelCss}>
            - 설교자
          </label>
          <input
            className={inputLabelCss}
            placeholder="ex: 최상훈 담임목사님"
            type="text"
            id="speaker"
            value={speaker}
            onChange={speakerHanlder}
          />
        </div>
        <div className="mb-4">
          <label className={labelCss}>-설교자 사진</label>
          <label className={labelInputCss} htmlFor="image">
            {imageFileName}
          </label>
          <input
            id="image"
            className="hidden"
            type="file"
            accept="image/jpg,impge/png,image/jpeg,"
            placeholder="이미지"
            onChange={imageChangeHandler}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className={labelCss}>
            - 날짜 선택
          </label>
          <input
            id="date"
            className={inputLabelCss}
            type="date"
            value={date}
            onChange={dateHanlder}
          />
        </div>
        <div className="my-4">
          <label htmlFor="time" className={labelCss}>
            - 시간 선택
          </label>
          <input
            id="time"
            className={inputLabelCss}
            type="time"
            value={time}
            onChange={timeHanlder}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="open-date" className={labelCss}>
            - 오픈날짜 선택
          </label>
          <input
            id="open-date"
            className={inputLabelCss}
            type="date"
            value={openDate}
            onChange={openDateHanlder}
          />
        </div>
        <div className="my-4 mb-10">
          <label htmlFor="open-time" className={labelCss}>
            - 오픈시간 선택
          </label>
          <input
            id="open-time"
            className={inputLabelCss}
            type="time"
            value={openTime}
            onChange={openTimeHanlder}
          />
        </div>
        <div className="text-right">
          <button type="submit" className={btnCss}>
            추가
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorshipEditForm;
