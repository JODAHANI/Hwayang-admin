import axios from "axios";
import React, { useState } from "react";
import { Routes, adminServer } from "../../../../constants/routeItems";

const inputCss =
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

const labelInputCss =
  "block shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer";

const labelCss = "block text-gray-700 text-base font-bold mb-1 ";

const { newFamily } = Routes;

const NewFamilyWriting = (props) => {
  const [name, setName] = useState("");
  const [invitationPerson, setInvitationPerson] = useState("");
  const [date, setDate] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [imageFileName, setImageFileName] = useState("사진을 선택해주세요.");
  const [errMessage, setErrMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const invitationPersonHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInvitationPerson(event.target.value);
  };

  const dateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const imageChangeHandler = (event) => {
    let file = event.target.files[0];
    file["path"] = file.name;
    setImageFile(file);
    setImageFileName(file.name);
  };

  const formSubmitHandler = async (event) => {
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

    axios
      .post(`${adminServer}/new-family/image-save`, formData, config)
      .then((res) => {
        if (res.data.success) {
          const body = {
            name,
            invitationPerson: invitationPerson ? invitationPerson : "없음",
            imagePath: res.data.imagePath,
            date,
          };
          axios
            .post(`${adminServer}/new-family/upload-new-family`, body)
            .then((res) => {
              props.history.push(newFamily);
            });
        }
      });
  };

  const formErrorCheck = () => {
    if (name.trim().length < 1) {
      setIsError(true);
      setErrMessage("이름을 작성해주세요.");
      return false;
    }
    if (invitationPerson.trim().length < 1) {
      setInvitationPerson("없음");
    }

    if (!date) {
      setIsError(true);
      setErrMessage("날짜를 선택해주세요.");
      return false;
    }

    if (!imageFile) {
      setIsError(true);
      setErrMessage("새가족 사진을 업로드해주세요.");
      return false;
    }

    return true;
  };

  return (
    <div className="section-screen max-w-7xl m-auto">
      <form
        onSubmit={formSubmitHandler}
        className="h-auto w-10/12 m-auto py-5"
        method="POST"
        encType="multipart/form-data"
      >
        {isError && (
          <p className="text-[crimson] pb-2 text-sm font-bold">
            오류 : {errMessage}
          </p>
        )}
        <div className="mb-4">
          <label className={labelCss} htmlFor="name">
            -새가족 이름
          </label>
          <input
            id="name"
            className={inputCss}
            type="text"
            placeholder="이름을 입력해주세요."
            value={name}
            onChange={nameHandler}
          />
        </div>
        <div className="mb-4">
          <label className={labelCss} htmlFor="invitationPerson">
            -새가족 데리고 온 사람
          </label>
          <input
            id="invitationPerson"
            className={inputCss}
            type="text"
            placeholder="이름을 입력해주세요. / 공백가능"
            value={invitationPerson}
            onChange={invitationPersonHandler}
          />
        </div>
        <div className="mb-4">
          <label className={labelCss}>-새가족 사진</label>
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
          <label className={labelCss} htmlFor="date">
            -등록날짜
          </label>
          <input
            id="date"
            className={inputCss}
            type="date"
            value={date}
            onChange={dateHandler}
          />
        </div>
        <button
          className="block w-1/3 py-2 bg-[#35C5F0] text-[#fff] rounded-3xl m-auto mt-10 font-bold"
          type="submit"
        >
          추가
        </button>
      </form>
    </div>
  );
};

export default NewFamilyWriting;
