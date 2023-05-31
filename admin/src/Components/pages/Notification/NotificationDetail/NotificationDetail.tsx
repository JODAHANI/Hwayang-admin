import axios from "axios";
import { adminImg, adminServer } from "constants/routeItems";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const LinkCss = "text-[#35C5F0] font-extrabold py-2 px-3 mx-3 max-sm:text-sm";

const NotificationDetail = ({ history }): JSX.Element => {
  const location = useLocation();
  const title = location.state.title;
  const contents = location.state.contents;
  const imagePath = location.state.imagePath;
  const id = location.state.id;
  const deleteHandler = async () => {
    const body = { id };
    const requestData = await axios.post(
      `${adminServer}/notification/delete`,
      body
    );
    const { data } = requestData;
    if (data.success) {
      history.replace("/admin/notification");
    }
  };
  return (
    <div className="max-w-screen-xl	m-auto">
      <div className="p-5">
        <h2 className="text-2xl py-3 px-8 mb-6 font-bold border-b-2 max-sm:text-xl max-sm:px-3 max-sm:py-1 text-[#222]">
          {title}
        </h2>
        <img src={`${adminImg}/${imagePath}`} alt="공지이미지" />
      </div>
      <div className="p-5">
        <div
          className="max-sm:text-sm"
          dangerouslySetInnerHTML={{ __html: contents }}
        ></div>
        <div className="text-end mt-10">
          <Link className={LinkCss} to={`/admin/notification/edit/${id}`}>
            수정
          </Link>
          <button className={LinkCss} type="button" onClick={deleteHandler}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetail;
