import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Routes } from "../../../constants/routeItems";
import { useDispatch, useSelector } from "react-redux";
import {
  getNewFamily,
  combineNewFamily,
} from "../../../_actions/newFamily_actions";
import LoadingSpinner from "Components/layout/LoadingSpinner/LoadingSpinner";

const { newFamilyWriting } = Routes;

let limit = 10;
let skip = 0;
const arr = [];

const NewFamily = () => {
  const dispatch: any = useDispatch();
  const newFamily = useSelector((state: any) => state?.newFamily?.newFamily);
  const allNewFamily = useSelector(
    (state: any) => state?.newFamily?.allNewFamily
  );
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);

  let newFamilysList;
  let divRef;

  const observer = new IntersectionObserver(
    async ([e]) => {
      if (e.isIntersecting) {
        setIsLoading(true);
        skip += limit;
        const body = {
          limit,
          skip,
        };
        const dispatchRequest = await dispatch(getNewFamily(body));
        await dispatch(combineNewFamily(dispatchRequest.payload.newFamily));
        setIsLoading(false);
      }
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    }
  );

  async function getNewFamilys(body) {
    if (!newFamily) {
      setIsLoading(true);
      const dispatchRequest = await dispatch(getNewFamily(body));
      await dispatch(combineNewFamily(dispatchRequest.payload.newFamily));
      setIsLoading(false);
    } else {
      if (newFamily.isScroll) {
        observer.observe(ref.current);
      } else {
        observer.unobserve(ref.current);
      }
    }
  }
  useEffect(() => {
    const body = {
      skip,
      limit,
    };
    getNewFamilys(body);
  }, [allNewFamily]);

  if (newFamily?.success) {
    newFamilysList = allNewFamily.map((item) => (
      <NewFamilyItems
        key={item._id}
        name={item.name}
        invitationPerson={item.invitationPerson}
        imagePath={item.imagePath}
        id={item._id}
        date={item.date}
      />
    ));
    divRef = <div ref={ref}></div>;
  }

  return (
    <div className="max-w-5xl m-auto">
      <div className="flex justify-between py-5 px-5">
        <h2 className="font-semibold">🔥 새가족 소개</h2>
        <button type="button">
          <Link
            className="inline-block py-2 px-3 text-xs text-[#fff] bg-[#35c5f0] font-semibold rounded-md "
            to={newFamilyWriting}
          >
            + 새가족 추가
          </Link>
        </button>
      </div>
      <div className="p-5">
        <ul className="notification-list">
          {newFamily?.success && (
            <>
              {newFamilysList}
              {divRef}
            </>
          )}

          {isLoading && <LoadingSpinner />}
        </ul>
      </div>
    </div>
  );
};
const NewFamilyItems = ({
  name,
  invitationPerson,
  imagePath,
  id,
  date,
}: {
  name: string;
  invitationPerson: string;
  imagePath: string;
  id: string;
  date: string;
}): JSX.Element => {
  return (
    <li className="mb-4">
      <Link
        className="block p-5 border-2 rounded-xl shadow-md text-sm font-medium"
        to={{
          pathname: `/admin/new-family/${id}`,
          state: { name, invitationPerson, imagePath, id, date },
        }}
      >
        <h2>{name}</h2>
      </Link>
    </li>
  );
};

export default NewFamily;
