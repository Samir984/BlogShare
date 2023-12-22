import { useSelector } from "react-redux";
import { getUserStatus } from "../authslice";
import { FaRegImage } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import dbService from "../../services/database";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function PostBlog({ post, type = "create" }) {
  const { status: userStatus, userData } = useSelector(getUserStatus);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { register, handleSubmit, formState, reset, setValue, getValues } =
    useForm({
      defaultValues: post || {},
    });
  const { errors } = formState;

  const onSubmit = async function (data) {
    const { featuredImage, title, content } = data;
    try {
      setIsLoading(true);
      if (type === "edit") {
        const file =
          typeof getValues("featuredImage") === "object"
            ? await dbService.uploadFile(featuredImage[0])
            : getValues("featuredImage");
        console.log("enter", file);
        if (file) {
          const fileId = typeof file === "object" ? file.$id : file;
          await dbService.updateBlog(post.$id, title, content, fileId);
          console.log("end", fileId);
        }
      } else {
        const file = await dbService.uploadFile(featuredImage[0]);
        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;
          await dbService.createBlog(title, content, fileId, userData.$id);
        }
      }
      toast.success("Blog is published sucessfully");
      reset();
    } catch (error) {
      toast.error("Error occur while Publishing blog");
    } finally {
      setSelectedImage(null);
      setIsLoading(false);
      navigate("/");
    }
  };
  useEffect(() => {
    if (type === "edit") {
      const imgUrl = dbService.getFilePreview(post.featuredImage);
      setSelectedImage(imgUrl);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onError = function (error) {
    // console.log(error);
    console.log(error);
  };

  return (
    <div className="w-full">
      {1 === 1 ? (
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex flex-col  flex-grow gap-3"
        >
          <label htmlFor="image">
            <div className="w-full bg-slate-100 min-h-[400px] ">
              {selectedImage === null && (
                <FaRegImage className="w-full h-64 " color="gray" />
              )}
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="feature-img"
                  className="w-full h-full"
                />
              )}
            </div>
          </label>
          <div className="">
            <input
              type="file"
              placeholder=""
              className="w-64 "
              id="image"
              {...register("featuredImage", {})}
              onChange={handleImageChange}
            />
            <p className="text-red-600">{errors.featuredImage?.message}</p>
          </div>

          <div className="bg-gray-200 h-16 mt-2">
            <input
              type="text"
              className="border-none w-full placeholder:text-5xl h-full  text-gray-500 text-4xl font-semibold"
              placeholder="Blog Title"
              {...register("title", {
                required: "This field in required",
              })}
            />
            <p className="text-red-600">{errors.title?.message}</p>
          </div>

          <div className="mt-3">
            <textarea
              className="outline-none w-full text-2xl  min-h-[200px]"
              placeholder="Content"
              {...register("content", {
                required: "This field in required",
              })}
            />
            <p className="text-red-600">{errors.content?.message}</p>
          </div>

          <button
            className="px-4 bg-red-600 text-cyan-50 text-xl py-2 w-fit "
            disabled={isLoading}
          >
            {isLoading ? "Publishing..." : "Publish"}
          </button>
        </form>
      ) : (
        <div className="text-2xl h-fit  text-red-500 font-mono ">
          Please Login to create your blog.
        </div>
      )}
    </div>
  );
}

export default PostBlog;
