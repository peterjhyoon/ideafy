import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useGetProjectQuery } from "../../components/projects/projectsApiSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
import defaultProjectLogo from "../../assets/images/defaultProjectLogo.png";

const ViewProject = () => {
    const { id } = useParams();

    const location = useLocation();
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);

    const redirectParam = searchParams.get("redirect");
    const keyParam = searchParams.get("key");
    const locationParam = searchParams.get("location");
    const categoryParam = searchParams.get("category");

    const {
        data: project,
        isLoading,
        isSuccess,
        isError,
    } = useGetProjectQuery({ id });

    const [imageSrc, setImageSrc] = useState(defaultProjectLogo);

    if (project?.logo) {
        console.log("hello");
        const blob = new Blob([project.logo], { type: "image/png" });
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
    }

    const onClose = () => {
        if (redirectParam === "/projects") {
            navigate(
                `/projects?key=${keyParam ? keyParam : ""}&location=${
                    locationParam ? locationParam : ""
                }&category=${categoryParam ? categoryParam : ""}`
            );
        } else {
            navigate(redirectParam);
        }
    };

    const onApply = () => {
        // TODO
    };

    let content;

    if (isLoading) {
        content = (
            <div className="w-full h-full flex-grow flex flex-col justify-center items-center">
                <ClipLoader color="#9ca3af" />
            </div>
        );
    }

    if (isError) {
        content = (
            <div className="w-full h-full flex justify-center items-center">
                <p className="text-gray-600">Project not found... :(</p>
            </div>
        );
    }

    if (isSuccess) {
        content = (
            <div className="w-full h-full flex flex-col relative">
                {/* Header */}
                <div className="h-[10%] ps-12 pe-8 pt-3 flex justify-between items-center bg-purple-700 rounded-t-[40px]">
                    <button
                        className="text-white hover:text-gray-300 focus:outline-none ml-auto"
                        onClick={onClose}
                    >
                        <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <img
                    className=" h-20 w-20 flex-shrink-0 mr-7 absolute top-8 left-16 rounded-full border border-black"
                    src={imageSrc}
                    alt="Project"
                />

                <div className="mt-14 mb-5 px-20">
                    <p className="font-bold text-3xl">{project.name}</p>
                    <div className="flex row justify-between">
                        <p className="font-bold text-md text-gray-500">
                            {project.location.state}, {project.location.country}
                        </p>
                        <p className="font-bold text-md text-gray-500">
                            {new Date(project.createdAt).toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col h-auto px-20 overflow-y-auto">
                    <p className="font-medium">{project.description}</p>
                </div>
                <button
                    className="z-10 rounded-full bg-purple-700 w-32 h-14 absolute bottom-14 right-20 hover:bg-purple-500"
                    onClick={onApply}
                >
                    <p className="text-white font-medium text-xl">Apply</p>
                </button>
            </div>
        );
    }

    return content;
};

export default ViewProject;
