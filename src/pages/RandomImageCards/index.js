import React, { useState, useEffect } from "react";
import { Row, Col, Button, Result, message, Popconfirm } from "antd";
import EditImage from "../EditImage";
import {
  getImageDetails,
  storeImages,
} from "../../redux/reducers/randomImages";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const RandomImageCards = () => {
  const [displayEditDrawer, setDisplayEditDrawer] = useState(false);
  const [imageList, setImageList] = useState([]);
  const dispatch = useDispatch();
  const { randomImageList } = useSelector(({ randomImages }) => ({
    randomImageList: randomImages.randomImageList,
  }));
  useEffect(() => {
    if (randomImageList?.length > 0) setImageList(randomImageList);
  }, [randomImageList]);
  const RenderItem = ({ item }) => (
    <div className="flex  mx-auto flex-col items-center max-w-xs my-4 mb-8">
      <div className="-mr-48 flex -mb-4 z-50 ">
        <Button
          type="primary"
          shape="circle"
          size="large"
          onClick={() => {
            dispatch(getImageDetails({ id: item?.id }));
            setDisplayEditDrawer(true);
          }}
        >
          <EditOutlined style={{ fontSize: "18px" }} />
        </Button>
        <Popconfirm
          title="Are you sure to delete this image?"
          onConfirm={() => {
            dispatch(
              storeImages(
                randomImageList?.filter((list) => list?.id !== item?.id)
              )
            );
            message.success("Image deleted successfully");
          }}
          onCancel={() => console.log(`no`)}
          okText="Yes"
          cancelText="No"
        >
          <Button className="ml-4" type="danger" shape="circle" size="large">
            <DeleteOutlined style={{ fontSize: "18px" }} />
          </Button>
        </Popconfirm>
      </div>
      <div
        style={{
          backgroundImage: `url(${item?.urls?.full})`,
          height: 180,
          width: 300,
        }}
        className="bg-gray-300 h-64 w-full rounded-lg shadow-md bg-cover bg-center"
      ></div>

      <div className="w-56 md:w-64 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden">
        <div className="py-2 text-center font-bold uppercase tracking-wide text-gray-800">
          {item?.user?.name}
        </div>
        <div className=" py-2 px-3 bg-gray-200">
          {item?.description || item?.alt_description || "N/A"}
        </div>
      </div>
    </div>
  );
  return (
    <div className="mx-12 my-6 flex justify-center ">
      {imageList?.length > 0 ? (
        <Row gutter={[24, 12]}>
          {imageList?.map((item) => (
            <Col key={item?.id} xs={24} sm={12} md={12} lg={8} xl={6}>
              <RenderItem item={item} />
            </Col>
          ))}
        </Row>
      ) : (
        <Result
          status="404"
          title="No item found!"
          subTitle="Sorry, no data exists."
        />
      )}
      <EditImage
        setDisplayEditDrawer={setDisplayEditDrawer}
        displayEditDrawer={displayEditDrawer}
      />
    </div>
  );
};

export default RandomImageCards;
