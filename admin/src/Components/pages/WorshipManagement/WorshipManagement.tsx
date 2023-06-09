import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WorshipApplyForm from "./WorshipApplyForm/WorshipApplyForm";
import { useDispatch, useSelector } from "react-redux";
import { getWorship } from "_actions/worship_action";
import { Routes, adminImg, adminServer } from "constants/routeItems";
import moment from "moment";

const { worshipManagement } = Routes;
const descCSs =
  "text-sm flex items-center italic font-semibold max-sm:text-xs max-sm:my-1 max-sm:not-italic max-sm:inline-block";

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
  const openDate = moment(new Date(`${item.openDate}T${item.openTime}`));
  const worshipTime = moment(new Date(`${item.date}T${item.time}`));
  const nowDate: any = moment(Date.now());
  const prev = moment.duration(nowDate.diff(worshipTime)).asSeconds();
  const prevCheck = Math.sign(prev) < 0 ? false : true;
  return (
    <li className="prays p-2 pl-5 my-4 shadow-md border-2 max-sm:text-xs w-full h-full relative max:sm:my-2 max-lg:px-2 max-lg:rounded-lg max-sm:py-0">
      <Link
        className="block w-full h-full py-1"
        to={`${worshipManagement}/${item._id}`}
      >
        <div className="worship-card h-auto flex my-3 max-sm:block">
          <img
            className="h-32 block rounded-md max-sm:m-auto max-lg:h-full m-auto max-sm:w-full"
            src={`${adminImg}/${item.imagePath}`}
            alt="설교자 사진"
          />
          <div className="center flex flex-col flex-start px-4 text-[#999] py-2 max-lg:my-4 max-sm:block max-sm:my-0 max-sm:mt-2">
            <div className=" flex items-center text-lg ">
              <span className="font-bold text-[#017d53] mx-2">
                {item.title}
              </span>
            </div>
            <div className=" flex items-center text-lg mb-2">
              <span className="font-bold text-[#00A36C] ml-3">
                - {item.speaker} -
              </span>
            </div>
            <div className={descCSs}>
              <span>날짜 : </span>
              <span className="mx-2 ml-1">{item.date}</span>
              <div className="hidden max-sm:block"></div>
              <span> 시간: </span>
              <span className="mx-1">{item.time}분</span>
            </div>
            <div className="hidden max-sm:block max-sm:my-1"></div>
            <div className={descCSs}>
              <span>오픈 날짜 : </span>
              <span className="mx-2 ml-1">{item.openDate}</span>
              <div className="hidden max-sm:block"></div>
              <span>오픈 시간: </span>
              <span className="mx-1">{item.openTime}분</span>
            </div>
            <div className={descCSs}>
              <span>신청인원 : </span>
              <span className="mx-1">{item.parti.length}</span>
            </div>
          </div>
          <div className="flex items-center mr-2">
            {!prevCheck ? (
              <button
                type="button"
                className="block px-4 text-[#fff] bg-[#3ed1fe] font-bold rounded-md max:sm:py-1 h-8 max-sm:w-full"
              >
                view
              </button>
            ) : (
              <button
                type="button"
                className="block px-4 text-[#fff] bg-[#444] font-bold rounded-md max:sm:py-1 h-8 max-sm:w-full"
              >
                지난예배
              </button>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default WorshipManagement;
