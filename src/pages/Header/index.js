import React, { useState, useEffect } from "react";
import { Modal, Avatar, Result } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import moment from "moment";
import {
  searchImagesByKeyword,
  storeSearchedImages,
} from "../../redux/reducers/randomImages";

export default function Header() {
  const [keyword, setKeyword] = useState("");
  const [displaySearchModal, setDisplaySearchModal] = useState(false);
  const action = (val) => setKeyword(val);
  const searchKeyword = debounce(action, 300);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchImagesByKeyword({ keyword }));
  }, [keyword]);
  const { searchResult } = useSelector(({ randomImages }) => ({
    searchResult: randomImages.searchResult,
  }));

  return (
    <div className="w-full mx-auto px-4">
      <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
        <div className="flex justify-between w-full ">
          <img
            className="h-8 w-auto sm:h-10"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt=""
          />
          <div
            className=" w-2/3 sm:w-1/3  flex justify-end"
            onClick={() => setDisplaySearchModal(true)}
          >
            <input
              disabled
              className="bg-grey-lightest border-2 outline-none w-full p-2 rounded-lg shadow-inner w-2/3"
              placeholder="Search"
              type="text"
            />
          </div>
        </div>
      </div>
      <Modal
        title={
          <div className="w-11/12 ">
            <input
              onChange={(e) => searchKeyword(e.target.value)}
              className="bg-grey-lightest border-2 outline-none w-full p-2 rounded-lg shadow-inner "
              placeholder="Search"
              type="text"
            />
          </div>
        }
        style={{ top: 20, right: 0 }}
        visible={displaySearchModal}
        footer={null}
        onCancel={() => {
          setDisplaySearchModal(false);
          dispatch(storeSearchedImages({}));
          setKeyword("");
        }}
      >
        <div style={{ maxHeight: 400, overflow: "auto" }}>
          {searchResult?.results?.length > 0 ? (
            <>
              {searchResult?.results?.map((item) => (
                <div
                  key={item?.id}
                  className="bg-white shadow rounded-lg items-center flex w-full my-2 border p-2"
                >
                  <Avatar size={80} src={item?.urls?.full} />
                  <div className="ml-4 w-full">
                    <div className="font-semibold text-lg">
                      By: {item?.user?.name}
                    </div>
                    <div className=" text-sm text-gray-600">
                      {item?.description || item?.alt_description || "N/A"}
                    </div>
                    <div className=" text-sm text-gray-300">
                      {moment(item?.created_at).format("LLL")}
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <Result
              status="404"
              title="No item found!"
              subTitle="Sorry, no data exists."
            />
          )}
        </div>
      </Modal>
    </div>
  );
}
