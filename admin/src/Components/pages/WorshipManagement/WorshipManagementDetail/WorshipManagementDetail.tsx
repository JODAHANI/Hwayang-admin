import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Routes } from "constants/routeItems";
import LoadingSpinner from "Components/layout/LoadingSpinner/LoadingSpinner";
import WorshipEditForm from "../WorshipEditForm/WorshipEditForm";

const { postWorship } = Routes;

const WorshipManagementDetail = (props) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [worship, setWorship]: any = useState(false);
  const [isForm, setIsForm] = useState(false);

  const isFormHandler = () => {
    setIsForm((prev) => !prev);
  };
  const hideFormHandler = () => {
    setIsForm((prev) => false);
  };

  const getWorship = async (body) => {
    const requestAxios = await axios.post(postWorship, body);
    const { data } = requestAxios;
    setWorship(data.offLineWorship);
    setIsLoading((prev) => false);
  };
  useEffect(() => {
    const body = { id };
    setIsLoading((prev) => true);
    getWorship(body);
  }, []);

  return (
    <div className="max-w-5xl m-auto px-5">
      {isLoading && <LoadingSpinner />}
      {worship && (
        <>
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
                {!isForm ? "+ 수정하기" : "- 취소"}
              </button>
            </div>
          </div>
          {isForm && (
            <WorshipEditForm offShowForm={hideFormHandler} item={worship} />
          )}
          <div className="px-4">
            <p className="text-xl max-sm:text-md font-bold">
              - {worship.title} / {worship.speaker}
            </p>
          </div>
          <div className="my-8 px-4">
            <h3 className="font-semibold">참석인원 : {worship.parti.length}</h3>
            <h4 className="my-2 font-semibold">참석명단 : </h4>
            <ul>
              {worship.parti.map((item) => (
                <Card key={item._id} item={item} />
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

const Card = (item) => {
  console.log(item);
  return (
    <ul>
      <h4>{item.name}</h4>
    </ul>
  );
};
export default WorshipManagementDetail;
