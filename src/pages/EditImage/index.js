import React, { useEffect, useState } from "react";
import { Drawer, Input, Button, Avatar, Form, Skeleton, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  storeImageDetails,
  storeImages,
} from "../../redux/reducers/randomImages";
import moment from "moment";

const EditImage = ({ setDisplayEditDrawer, displayEditDrawer }) => {
  const [editImageLoading, setEditImageLoading] = useState(false);
  const { imageDetails, randomImageList } = useSelector(({ randomImages }) => ({
    imageDetails: randomImages.imageDetails,
    randomImageList: randomImages.randomImageList,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    form?.setFieldsValue({
      description: imageDetails?.description || imageDetails?.alt_description,
    });
  }, [imageDetails]);
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      hideRequiredMark
      onFinish={(values) => {
        setEditImageLoading(true);
        if (
          values?.description !== imageDetails?.description ||
          values?.description !== imageDetails?.alt_description
        ) {
          const modifiedList = randomImageList?.map((item) => {
            return {
              ...item,
              description: item?.id === imageDetails?.id && values?.description,
            };
          });
          dispatch(storeImages(modifiedList));
          message.success("Image description updated successfully");
        }
        setTimeout(() => {
          setEditImageLoading(false);
          setDisplayEditDrawer(false);
          dispatch(storeImageDetails({}));
        }, 300);
      }}
    >
      <Drawer
        title={null}
        width={720}
        onClose={() => {
          setDisplayEditDrawer(false);
          dispatch(storeImageDetails({}));
        }}
        visible={displayEditDrawer}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button
              onClick={() => {
                setDisplayEditDrawer(false);
                dispatch(storeImageDetails({}));
              }}
              style={{ marginRight: 8 }}
            >
              Cancel
            </Button>
            <Button
              loading={editImageLoading}
              onClick={() => form?.submit()}
              type="primary"
            >
              Edit
            </Button>
          </div>
        }
      >
        <Skeleton loading={!imageDetails?.id}>
          <div className="mt-6">
            <div className="flex items-center w-full">
              <Avatar
                src={imageDetails?.user?.profile_image?.medium}
                className="w-8"
                size={50}
              />
              <div className="ml-4 w-full">
                <div className="font-semibold text-lg">
                  {imageDetails?.user?.name}
                </div>
                <div className=" text-sm text-gray-600">
                  {imageDetails?.user?.bio}
                </div>
                <div className=" text-sm text-gray-300">
                  {moment(imageDetails?.created_at).format("LLL")}
                </div>
              </div>
            </div>

            <div className="my-4 w-full">
              <img
                alt=""
                src={imageDetails?.urls?.full}
                className="rounded-lg"
                style={{
                  height: 300,
                  width: 900,
                  maxHeight: 300,
                  maxWidth: 900,
                }}
              />
            </div>
            <div className="font-semibold">Description</div>
            <Form.Item name="description">
              <Input.TextArea rows={4} placeholder="please enter description" />
            </Form.Item>
          </div>
        </Skeleton>
      </Drawer>
    </Form>
  );
};

export default EditImage;
