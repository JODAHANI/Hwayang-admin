import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WorshipApplyForm from "./WorshipApplyForm/WorshipApplyForm";
import { useDispatch, useSelector } from "react-redux";
import { getWorship } from "_actions/worship_action";
import { Routes } from "constants/routeItems";

const { worshipManagement } = Routes;

const WorshipManagement = () => {
  const dispatch: any = useDispatch();
  const allWorship = useSelector((state: any) => state?.worship?.allWorship);
  const worship = useSelector((state: any) => state?.worship?.worship);
  const [isForm, setIsForm] = useState(false);

  const isFormHandler = () => {
    setIsForm((prev) => !prev);
  };

  const hideFormHandler = () => {
    setIsForm((prev) => false);
  };

  useEffect(() => {
    getLoadWorship();
  }, [allWorship]);

  const getLoadWorship = async () => {
    if (!allWorship.length) {
      await dispatch(getWorship());
    }
  };

  return (
    <div className="max-w-5xl m-auto px-5">
      <div className="flex justify-between py-5 items-center">
        <div>
          <h2 className="font-semibold">🏆 예배관리</h2>
          <h3 className="p-3 py-1 text-[#888] max-sm:text-xs text-sm italic">
            ※ 시간과 날짜를 꼼꼼히 체크해주세요 ※
          </h3>
        </div>
        <div>
          <button
            type="button"
            className="inline-block py-2 px-4 text-xs text-[#fff] bg-[#3ed1fe] font-bold rounded-lg max:sm:py-1"
            onClick={isFormHandler}
          >
            {!isForm ? "+ 추가하기" : "- 취소"}
          </button>
        </div>
      </div>
      {isForm && <WorshipApplyForm offShowForm={hideFormHandler} />}
      <ul className="w-5/6 m-auto ">
        {worship?.success &&
          allWorship.map((item) => <Card key={item._id} item={item} />)}
      </ul>
    </div>
  );
};

const Card = ({ item }) => {
  return (
    <li className="prays p-2 pl-5 my-4 shadow-md border-2 max-sm:text-xs">
      <Link
        className="block w-full h-full py-1"
        to={`${worshipManagement}/${item._id}`}
      >
        <div className="worship-card h-auto flex my-3">
          <img
            className="h-32 inline-block rounded-md"
            src={`http://localhost:9000/${item.imagePath}`}
            alt="설교자 사진"
          />
          <div className="center flex flex-col flex-start px-4 text-[#999] py-2">
            <div className=" flex items-center text-lg ">
              <span className="font-bold text-[#222] mx-2">{item.title}</span>
            </div>
            <div className=" flex items-center text-lg mb-2">
              <span className="font-bold text-[#333] ml-3">
                - {item.speaker} -
              </span>
            </div>
            <div className="text-sm flex items-center italic font-semibold">
              <span>날짜 : </span>
              <span className="mx-2 ml-1">{item.date} /</span>
              <span> 시간: </span>
              <span className="mx-1">{item.time}분</span>
            </div>
            <div className="text-sm flex items-center italic font-semibold">
              <span>오픈 날짜 : </span>
              <span className="mx-2 ml-1">{item.openDate} /</span>
              <span>오픈 시간: </span>
              <span className="mx-1">{item.openTime}분</span>
            </div>
            <div className="text-sm flex items-center italic font-semibold">
              <span>신청인원 : </span>
              <span className="mx-1">{item.parti.length}</span>
            </div>
          </div>
          <div className="flex items-center mr-2">
            <button
              type="button"
              className="block px-4 text-[#fff] bg-[#3ed1fe] font-bold rounded-md max:sm:py-1 h-8"
            >
              view
            </button>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default WorshipManagement;
