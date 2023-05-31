import axios from "axios";
import React, { useEffect, useState, useRef, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { notificationImageSave } from "_actions/user_actions";
import { Routes, adminServer } from "../../../../constants/routeItems";

const inputCss =
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

const labelInputCss =
  "block shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer";

const labelCss = "block text-gray-700 text-base font-bold mb-1 ";
const { notification } = Routes;

const NotificationEdit = (props): JSX.Element => {
  const params = useParams();
  const { id } = params;
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState("");
  const [title, setTitle] = useState("");
  const [imagePath, setimagePath] = useState("");

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
    axios.post("/api/admin/notification/get-notification", body).then((res) => {
      if (res.data.success) {
        const data = res.data.notification;
        setTitle(data.title);
        setContents(data.contents);
        setimagePath(data.imagePath);
      }
    });
  }, [id]);

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const imageChangeHandler = (event) => {
    let file = event.target.files[0];
    file["path"] = file.name;
    setImageFile(file);
    setImageFileName(file.name);
  };

  const editNotificationAxios = (body) => {
    axios
      .post(`${adminServer}/notification/edit-notification`, body)
      .then((res) => {
        if (res.data.success) {
          props.history.push(notification);
        }
      });
  };
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const checkForm = formErrorCheck();
    if (!checkForm) {
      return;
    }
    setIsError(false);
    if (!imageFile) {
      const body = {
        id,
        title,
        contents,
        imagePath,
      };
      editNotificationAxios(body);
    } else {
      let formData = new FormData();
      formData.append("file", imageFile);
      const imageSaveData = await notificationImageSave(formData);
      const body = {
        id,
        title,
        contents,
        imagePath: imageSaveData.filePath,
      };
      editNotificationAxios(body);
    }
  };

  const formErrorCheck = () => {
    if (title.trim().length < 1) {
      setIsError(true);
      setErrMessage("제목을 작성해주세요.");
      return false;
    }

    if (contents.trim().length < 1) {
      setIsError(true);
      setErrMessage("본문 내용을 작성해주세요.");
      return false;
    }
    return true;
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ color: [] }, "bold", "italic", "underline"],

          [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
        ],
      },
    }),
    []
  );

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
          <label className={labelCss} htmlFor="title">
            -공지 제목
          </label>
          <input
            id="title"
            className={inputCss}
            type="text"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={titleHandler}
          />
        </div>
        <div className="mb-4">
          <label className={labelCss}>-공지 이미지</label>
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

        <ReactQuill
          className="rounded-3xl"
          ref={(element) => {
            if (element !== null) {
              QuillRef.current = element;
            }
          }}
          value={contents}
          onChange={setContents}
          modules={modules}
          theme="snow"
          placeholder="내용을 입력해주세요."
        />
        <button
          className="block w-1/3 py-2 bg-[#35C5F0] text-[#fff] rounded-3xl m-auto mt-10 font-bold"
          type="submit"
        >
          전송
        </button>
      </form>
    </div>
  );
};

export default NotificationEdit;
