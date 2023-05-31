import { deleteNewFamily } from "_actions/newFamily_actions";
import { adminImg, adminServer } from "constants/routeItems";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

const NewFamilyDetail = () => {
  const location = useLocation();
  const dispatch: any = useDispatch();
  const history = useHistory();
  const name = location.state.name;
  const invitationPerson = location.state.invitationPerson;
  const imagePath = location.state.imagePath;
  const date = location.state.date;
  const id = location.state.id;

  const userDeleteHandler = async () => {
    const body = {
      id,
    };
    const requestResult = await dispatch(deleteNewFamily(body));
    if (requestResult.payload.success) {
      history.replace("/admin/new-family");
    }
  };
  return (
    <div className="max-w-screen-xl	m-auto">
      <div className="p-4 mt-5 text-end max-sm:text-xs text-[#DC143C]">
        <button
          onClick={userDeleteHandler}
          className="p-3 px-5 font-black "
          type="button"
        >
          삭제
        </button>
      </div>
      <div className="px-3">
        <div className=" w-full text-2xl py-3 px-8 font-bold max-sm:text-xl max-sm:px-3 bg-[#FFD4D4] rounded-t-xl ">
          <span className="text-base text-[#fff] font-semibold px-1">
            이름:
          </span>
          <span className="max-sm:text-sm text-[#fff] font-semibold px-1">
            {name}
          </span>
        </div>
        <img
          className="block m-auto"
          src={`${adminImg}/${imagePath}`}
          alt="공지이미지"
        />
      </div>
      <div className="px-5">
        <h2 className="p-4 font-semibold  bg-[#B4E4FF] my-2 text-[#fff] max-sm:font-xs rounded-lg">
          인도자 : {invitationPerson}
        </h2>
        <h3 className="p-4 font-semibold bg-[#95BDFF] my-2 text-[#fff] max-sm:font-xs rounded-lg">
          등록일 : {date}
        </h3>
      </div>
    </div>
  );
};

export default NewFamilyDetail;
