import React, { useState } from "react";
import { deleteLetters } from "_actions/letters_action";
import { useDispatch } from "react-redux";

const ThanksLetterDetail = (props): JSX.Element => {
  const dispath: any = useDispatch();
  const item = props.location.state.item;
  const [isClick, setisClick] = useState(false);

  const deleteHandler = async () => {
    if (!isClick) {
      const body = {
        id: item._id,
        from: item.from._id,
      };
      setisClick((prev) => true);
      const requestDispatch = await dispath(deleteLetters(body));
      if (requestDispatch.payload.success) {
        props.history.replace("/admin/thanks-letter");
      }
    }
  };

  return (
    <div className="full-screen bg-[#f4e0b7] flex justify-center items-center">
      <div className="w-8/12 m-auto border-2 border-[#fff] h-4/6 rounded-xl p-5 relative max-sm:h-5/6 max-sm:border-2">
        <h2 className="text-center my-5 max-sm:text-sm font-bold text-xl">
          {item.title}
        </h2>
        <div className=" flex justify-between items-center mb-5">
          <p className="text-[#222] font-bold  max-sm:text-xs">To. {item.to}</p>
          <div className="text-[#666] font-semibold max-sm:text-xs">
            <button onClick={deleteHandler} type="button">
              삭제
            </button>
          </div>
        </div>
        <div
          className="letter-content overflow-y-auto h-5/6 max-sm:text-xs"
          dangerouslySetInnerHTML={{ __html: item.contents }}
        ></div>
        <p className="absolute bottom-1 right-10 text-[#222] font-bold mb-5 text-right max-sm:bottom-1 max-sm:text-xs">
          from. {item.from.name}
        </p>
      </div>
    </div>
  );
};

export default ThanksLetterDetail;
