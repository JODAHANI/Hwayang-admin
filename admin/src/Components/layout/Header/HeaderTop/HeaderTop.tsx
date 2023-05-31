import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../../../../index.css";
import { useDispatch, useSelector } from "react-redux";

import { ReduxStateType } from "../../../../constants/types";
import { userLogout } from "../../../../_actions/user_actions";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

// 모바일 CSS
const mobileHeaderTopCss = "flex justify-between items-center m-auto py-2 px-5";
const mobileSidebarContainerCss = "fixed z-50 top-0 w-full h-full bg-[#000]/80";
const mobileSidebarInnerCss =
  "absolute top-0 w-3/5 h-full bg-[#fff] transition-all  duration-100";
const rounded = "rounded-br-lg rounded-tr-lg";
const spanCss = "block w-full h-0.5 absolute bg-[#000] left-0 cursor-pointer";

const HeaderTop = (): JSX.Element => {
  const user = useSelector((state: ReduxStateType) => state.user);
  return (
    <div className="header-top">
      <div className={`mobile ${mobileHeaderTopCss}`}>
        <View user={user} />
      </div>
    </div>
  );
};

//모바일 View 컴포넌트
const View = ({ user }): JSX.Element => {
  const [inputCheckbox, setinputCheckbox] = useState(false);
  const history = useHistory();
  const dispatch: any = useDispatch();

  const logoutHandler = (event: React.MouseEvent) => {
    Swal.fire({
      title: "로그아웃 하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네",
      cancelButtonText: "아니오",
      reverseButtons: false, // 버튼 순서 거꾸로
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(userLogout()).then((res) => {
          if (res.payload.success) {
            history.push("/");
          }
        });
      }
    });
  };

  const inputCheckboxHandler = () => {
    setinputCheckbox((prev) => {
      return !prev;
    });
  };

  return (
    <>
      <div className="text-sm font-semibold w-4	h-3 cursor-pointer">
        <input
          id="trigger"
          type="button"
          className="hidden"
          onClick={inputCheckboxHandler}
        />
        <label
          className="block relative w-full h-full cursor-pointer "
          htmlFor="trigger"
        >
          <span className={`${spanCss} top-0`}></span>
          <span className={`${spanCss} top-1/2`}></span>
          <span className={`${spanCss} top-full`}></span>
        </label>
        {inputCheckbox ? (
          <div
            className={`${mobileSidebarContainerCss} left-0`}
            onClick={inputCheckboxHandler}
          >
            <div
              className={`${mobileSidebarInnerCss} ${rounded}  left-0 ease-in `}
            >
              <ul></ul>
            </div>
          </div>
        ) : (
          <div className={`${mobileSidebarContainerCss} -left-full`}>
            <div
              className={`${mobileSidebarInnerCss} -left-full ease-out`}
            ></div>
          </div>
        )}
      </div>
      <Link to="/admin/worship-management">
        <h2 className="text-xl font-extrabold hover:text-zinc-700 transition-all inline mr-0.5 max-sm:text-base">
          화양교회
        </h2>
        <span className="text-xs font-extrabold hover:text-zinc-700">
          관리자
        </span>
      </Link>
      <div className="text-sm font-medium ">
        <div className=" flex justify-center items-center">
          <button className="text-xs font-bold" onClick={logoutHandler}>
            <FontAwesomeIcon icon={faCircleXmark} size="lg" />
          </button>
        </div>
      </div>
    </>
  );
};

export default HeaderTop;
