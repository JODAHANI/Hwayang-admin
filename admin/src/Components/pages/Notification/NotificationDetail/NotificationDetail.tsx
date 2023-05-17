import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const LinkCss =
  "block w-28 max-sm:w-12 max-sm:px-1 text-center border-2 max-sm:text-xs max-sm:py-1 py-2 px-5 bg-[#35C5F0] text-[#fff] rounded-3xl m-auto mt-10 font-bold border-none";
const NotificationDetail = (): JSX.Element => {
  const location = useLocation();
  const title = location.state.title;
  const contents = location.state.contents;
  const imagePath = location.state.imagePath;
  const id = location.state.id;

  return (
    <div className="max-w-screen-xl	m-auto">
      <div className="p-5">
        <h2 className="text-2xl py-3 px-8 mb-6 font-bold border-b-2 max-sm:text-xl max-sm:px-3 max-sm:py-1 text-[#222]">
          {title}
        </h2>
        <img src={`http://localhost:80/${imagePath}`} alt="공지이미지" />
      </div>
      <div className="p-5">
        <div
          className="max-sm:text-sm"
          dangerouslySetInnerHTML={{ __html: contents }}
        ></div>
        <Link className={LinkCss} to={`/admin/notification/edit/${id}`}>
          수정
        </Link>
      </div>
    </div>
  );
};

export default NotificationDetail;
