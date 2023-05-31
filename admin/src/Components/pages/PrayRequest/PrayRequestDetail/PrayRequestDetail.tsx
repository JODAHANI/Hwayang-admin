import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deletePrays, editPrays } from "../../../../_actions/pray_actions";
import NotFound from "Components/layout/NotFound/NotFound";
import LoadingSpinner from "../../../layout/LoadingSpinner/LoadingSpinner";
import { Routes } from "constants/routeItems";

const { getPrayRequest } = Routes;
const inputLabelCss =
  "p-3 rounded-md bg-[#f0f0f0] w-full border border-[#ccc] focus:bg-[#fff] focus:outline-cyan-500 max-sm:p-1";
const btnCss =
  "bg-[#3ed1fe] text-[#fff] rounded-md py-1 px-5 font-bold border border-[#3ed1fe] text-sm";

const PrayRequestDetail = (props) => {
  const dispatch: any = useDispatch();
  const params: any = useParams();
  const prays = useSelector((state: any) => state?.pray);
  const id = params.id;
  const [pray, setPray] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isNull, setIsNull] = useState(null);

  const requestData = async () => {
    const body = {
      id,
    };
    const axiosRequest = await axios.post(getPrayRequest, body);
    const { data } = axiosRequest;
    if (data.success) {
      setPray(data.pray);
      setTitle(data.pray.title);
      setText(data.pray.text);
    } else {
      setIsNull(true);
    }
  };
  useEffect(() => {
    requestData();
  }, []);

  const deleteHandler = async () => {
    const body = {
      id,
    };
    await dispatch(deletePrays(body, prays));
    props.history.replace("/admin/pray-request");
  };
  if (isNull) return <NotFound />;
  if (pray == null) return <LoadingSpinner />;

  return (
    <>
      <figure className="bg-[#41cef9] text-white rounded-md p-12 m-auto my-10 mb-5 max-w-screen-md w-5/6 font-bold shadow-md">
        <p className="text-lg max-sm:text-sm">{pray.text}</p>
        <div className="text-md max-sm:text-xs italic text-[#f0ffa3] text-right mt-10">
          <figcaption>{pray?.title}</figcaption>
          <h3>
            - {pray?.writer.name} {pray?.writer.position.position} -
          </h3>
        </div>
      </figure>
      <div className="mt-5">
        <div className="m-auto max-w-screen-md w-5/6 flex justify-end px-5 mb-5">
          <button
            className="rounded-lg text-[#777] max-sm:text-xs font-semibold px text-sm"
            type="button"
            onClick={deleteHandler}
          >
            삭제
          </button>
        </div>
      </div>
    </>
  );
};

export default PrayRequestDetail;
