import { Outlet } from "react-router-dom";

const UsersLayout = () => {
    return (
        <div className="w-full pt-14 bg-gray-200 flex-grow flex flex-col">
            <Outlet />
        </div>
    );
};

export default UsersLayout;
