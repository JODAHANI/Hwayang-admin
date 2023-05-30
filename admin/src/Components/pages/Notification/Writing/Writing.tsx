import React, { useRef, useState, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { notificationImageSave, postNotification } from "_actions/user_actions";
import { Routes } from "../../../../constants/routeItems";

const inputCss =
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

const labelInputCss =
  "block shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer";

const labelCss = "block text-gray-700 text-base font-bold mb-1 ";

const { notification } = Routes;
const Writing = (props): JSX.Element => {
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState("");
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [imageFileName, setImageFileName] = useState("사진을 선택해주세요.");
  const [errMessage, setErrMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
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
    setIsError(false);
    let formData = new FormData();
    formData.append("file", imageFile);
    const imageSaveData = await notificationImageSave(formData);
    const body = {
      title,
      contents,
      imagePath: imageSaveData.filePath,
    };

    await postNotification(body);
    props.history.push(notification);
  };

  const formErrorCheck = () => {
    if (title.trim().length < 1) {
      setIsError(true);
      setErrMessage("제목을 작성해주세요.");
      return false;
    }
    if (!imageFile) {
      setIsError(true);
      setErrMessage("공지 이미지를 업로드해주세요.");
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

export default Writing;

// 이미지를 업로드 하기 위한 함수
// const imageHandler = () => {
//   // 파일을 업로드 하기 위한 input 태그 생성
//   const input = document.createElement("input");
//   const formData = new FormData();
//   let url = "";

//   input.setAttribute("type", "file");
//   input.setAttribute("accept", "image/*");
//   input.click();

//   // 파일이 input 태그에 담기면 실행 될 함수
//   input.onchange = async () => {
//     let file = input.files[0];
//     let image_Url = URL.createObjectURL(file);
//     url = URL.createObjectURL(file);
//     if (file !== null) {
//       formData.append("image", file[0]);
//     }

//     console.log(url, image_Url);
//     const range = QuillRef.current?.getEditor().getSelection()?.index;
//     if (range !== null && range !== undefined) {
//       let quill = QuillRef.current?.getEditor();

//       quill?.setSelection(range, 1);

//       quill?.clipboard.dangerouslyPasteHTML(
//         range,
//         `<img src=${url} alt="이미지 태그가 삽입됩니다." />`
//       );
//     }
//   };
// };
