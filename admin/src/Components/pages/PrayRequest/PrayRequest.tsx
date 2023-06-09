import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  postPrays,
  addPrays,
  combinePrays,
} from "../../../_actions/pray_actions";
import LoadingSpinner from "../../layout/LoadingSpinner/LoadingSpinner";

const limit = 30;
let skip = 0;

const PrayRequest = (props) => {
  const dispatch: any = useDispatch();
  const user = useSelector((state: { user: any }) => state.user);
  const prays = useSelector((state: any) => state?.pray?.prays);
  const allPrays = useSelector((state: any) => state?.pray?.allPrays);
  const [isLoading, setIsLoading] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const titleInputRef: any = useRef();
  const textInputRef: any = useRef();
  const checkedRef: any = useRef(false);
  const ref = useRef(null);

  const submitFormHandler = async (event) => {
    event.preventDefault();
    const title = titleInputRef.current.value;
    const text = textInputRef.current.value;
    const isSecret = checkedRef.current.checked;
    const body = {
      title,
      text,
      writer: user?.userData?.id,
      isSecret,
    };
    const axiosRequest = await axios.post(
      "/api/users/pray-request/write",
      body
    );
    const data = axiosRequest.data;
    if (data.success) {
      dispatch(addPrays(prays, data.pray));
    }
    setIsForm(false);
  };

  const isFormHandler = () => {
    setIsForm((prev) => !prev);
  };

  const observer = new IntersectionObserver(
    async ([e]) => {
      if (e.isIntersecting) {
        setIsLoading((prev) => true);
        skip += limit;
        const body = {
          limit,
          skip,
        };
        const dispatchRequest = await dispatch(postPrays(body));
        await dispatch(combinePrays(dispatchRequest.payload.pray));
        setIsLoading((prev) => false);
      }
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    }
  );

  async function getLoadPrays(body) {
    if (!prays) {
      setIsLoading((prev) => true);
      const dispatchRequest = await dispatch(postPrays(body));
      await dispatch(combinePrays(dispatchRequest.payload.pray));
      setIsLoading((prev) => false);
    } else {
      if (prays.isScroll) {
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
    getLoadPrays(body);
  }, [allPrays]);

  return (
    <div className="max-w-5xl m-auto">
      <div className="flex justify-between py-5 px-5">
        <div>
          <h2 className="font-semibold">🙏🏻 기도요청</h2>
          <h3 className="p-3 py-1 text-[#888] max-sm:text-xs text-sm">
            - 기도 제목을 공유해주세요!
          </h3>
        </div>
      </div>

      <ul className="w-5/6 m-auto ">
        {prays?.success &&
          allPrays.map((item) => (
            <Card key={item._id} item={item} user={user} />
          ))}
      </ul>
      {prays?.success && <div className="h-9 my-1" ref={ref}></div>}
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default PrayRequest;

const Card = ({ item, user }) => {
  return (
    <li className="prays p-2 pl-5 my-4 flex justify-between items-center shadow-md border-2 rounded-xl max-sm:text-xs">
      <p className="font-semibold text-[#333]">{item.title}</p>
      <Link
        className="transition-all	text-[#3ed1fe] font-extrabold px-4 py-2 hover:text-[#FFA500]"
        to={`/admin/pray-request/${item._id}`}
      >
        view
      </Link>
    </li>
  );
};
