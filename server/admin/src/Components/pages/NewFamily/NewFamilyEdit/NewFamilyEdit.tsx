import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Routes } from "../../../../constants/routeItems";

const inputCss =
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

const labelInputCss =
  "block shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer";

const labelCss = "block text-gray-700 text-base font-bold mb-1 ";
const { newFamily } = Routes;

const NewFamilyEdit = (props): JSX.Element => {
  const params = useParams();
  const { id } = params;
  const [date, setdate] = useState("");
  const [name, setName] = useState("");
  const [imagePath, setimagePath] = useState("");
  const [invitationPerson, setInvitationPerson] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [imageFileName, setImageFileName] = useState(
    "사진을 선택해주세요. / 미선택 가능"
  );
  const [errMessage, setErrMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const body = {
      id,
    };
    axios.post("/api/admin/new-family/get-new-family", body).then((res) => {
      if (res.data.success) {
        const newFamily = res.data.newFamily;
        setdate(newFamily.date);
        setimagePath(newFamily.imagePath);
        setInvitationPerson(newFamily.invitationPerson);
        setName(newFamily.name);
      }
    });
  }, [id]);

  const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const dateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setdate(event.target.value);
  };
  const invitationPersonHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInvitationPerson(event.target.value);
  };

  const imageChangeHandler = (event) => {
    let file = event.target.files[0];
    file["path"] = file.name;
    setImageFile(file);
    setImageFileName(file.name);
  };

  const editNewFamilyAxios = (body) => {
    axios.post("/api/admin/new-family/edit-new-family", body).then((res) => {
      if (res.data.success) {
        props.history.push(newFamily);
      }
    });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const checkError = formErrorCheck();
    if (!checkError) {
      return;
    }
    setIsError(false);
    if (!imageFile) {
      const body = {
        id,
        name,
        invitationPerson,
        date,
        imagePath,
      };
      editNewFamilyAxios(body);
    } else {
      let formData = new FormData();
      formData.append("file", imageFile);
      const config: object = {
        header: { "content-type": "multipart/form-data" },
      };

      axios
        .post("/api/admin/new-family/image-save", formData, config)
        .then((res) => {
          if (res.data.success) {
            const body = {
              name,
              invitationPerson: invitationPerson ? invitationPerson : "없음",
              imagePath: res.data.imagePath,
              date,
            };
            editNewFamilyAxios(body);
          }
        });
    }
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
          수정
        </button>
      </form>
    </div>
  );
};

export default NewFamilyEdit;
