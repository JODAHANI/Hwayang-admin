import React, { useRef, useState } from "react";
import { addWorship, imageSave } from "_actions/worship_action";
import { useDispatch } from "react-redux";

const inputLabelCss =
  "px-3 py-2 rounded-md shadow bg-[#f0f0f0] w-full border border-[#ccc] focus:bg-[#fff] focus:outline-cyan-500 max-sm:p-1 max-sm:px-3 text-[#454B1B] hover:cursor-pointer placeholder:text-[#999]";
const btnCss =
  "bg-[#3ed1fe] text-[#fff] rounded-xl py-2 w-6/12 m-auto font-black border border-[#3ed1fe] text-md block";
const labelInputCss =
  "px-3 py-2 rounded-md block shadow bg-[#f0f0f0] w-full border-[#ccc] text-[#454B1B] leading-tight focus:outline-cyan-500 max-sm:p-1 max-sm:px-3 hover:cursor-pointer";

const labelCss = "block font-bold mb-2";

const WorshipApplyForm = ({ offShowForm }) => {
  const dispatch: any = useDispatch();
  const titleInputRef: any = useRef();
  const limitInputRef: any = useRef();
  const speakerInputRef: any = useRef();
  const dateInputRef: any = useRef();
  const timeInputRef: any = useRef();
  const openDateInputRef: any = useRef();
  const openTimeInputRef: any = useRef();

  const [isError, setIsError] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const [imageFileName, setImageFileName] = useState("사진을 선택해주세요.");
  const [errMessage, setErrMessage] = useState("");

  const formErrorCheck = () => {
    if (titleInputRef.current.value.length <= 1) {
      setIsError(true);
      setErrMessage("예배 타이틀을 입력해주세요.");
      return false;
    }
    if (limitInputRef.current.value.length <= 1) {
      setIsError(true);
      setErrMessage("제한 인원을 입력해주세요.");
      return false;
    }
    if (speakerInputRef.current.value.length <= 1) {
      setIsError(true);
      setErrMessage("설교자를 입력해주세요.");
      return false;
    }
    if (!imageFile) {
      setIsError(true);
      setErrMessage("설교자 사진을 업로드해주세요.");
      return false;
    }
    if (!dateInputRef.current.value.length) {
      setIsError(true);
      setErrMessage("날짜를 선택해주세요.");
      return false;
    }
    if (!timeInputRef.current.value.length) {
      setIsError(true);
      setErrMessage("시간을 선택해주세요.");
      return false;
    }

    if (!openDateInputRef.current.value.length) {
      setIsError(true);
      setErrMessage("오픈날짜를 선택해주세요.");
      return false;
    }
    if (!openTimeInputRef.current.value.length) {
      setIsError(true);
      setErrMessage("오픈시간을 선택해주세요.");
      return false;
    }

    return true;
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

    const requestImageSave = await imageSave(formData, config);
    if (requestImageSave.payload.success) {
      const body = {
        title: titleInputRef.current.value,
        limit: limitInputRef.current.value,
        speaker: speakerInputRef.current.value,
        date: dateInputRef.current.value,
        time: timeInputRef.current.value,
        openDate: openDateInputRef.current.value,
        openTime: openTimeInputRef.current.value,
        imagePath: requestImageSave.payload.imagePath,
      };

      const requestDispatch = await dispatch(addWorship(body));
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
            ref={titleInputRef}
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
            ref={limitInputRef}
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
            ref={speakerInputRef}
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
            ref={dateInputRef}
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
            ref={timeInputRef}
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
            ref={openDateInputRef}
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
            ref={openTimeInputRef}
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

export default WorshipApplyForm;
