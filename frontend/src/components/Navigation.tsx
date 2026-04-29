import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PendingIcon from "@mui/icons-material/Pending";
import MessageIcon from "@mui/icons-material/Message";
import ListAltIcon from "@mui/icons-material/ListAlt";
import GroupIcon from "@mui/icons-material/Group";
import VerifiedIcon from "@mui/icons-material/Verified";
import ExploreIcon from "@mui/icons-material/Explore";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface NavItem {
  title: string;
  icon: React.ReactNode;
  path: string;
}

const navigation: NavItem[] = [
  { title: "Home", icon: <HomeIcon />, path: "/home" },
  { title: "Explore", icon: <ExploreIcon />, path: "/explore" },
  { title: "Notifications", icon: <NotificationsIcon />, path: "/notifications" },
  { title: "Messages", icon: <MessageIcon />, path: "/messages" },
  { title: "Lists", icon: <ListAltIcon />, path: "/list" },
  { title: "Communities", icon: <GroupIcon />, path: "/communities" },
  { title: "Verified", icon: <VerifiedIcon />, path: "/verified" },
  { title: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
  { title: "More", icon: <PendingIcon />, path: "/more" },
];

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = 5;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="h-screen sticky top-0 p-4 space-y-2 flex flex-col justify-between">

      {/* NAVIGATION */}
      <div>
        {navigation.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <div
              key={index}
              onClick={() =>
                item.title === "Profile"
                  ? navigate(`/profile/${userId}`)
                  : navigate(item.path)
              }
              className={`flex items-center space-x-3 p-3 rounded-full cursor-pointer transition hover:bg-gray-100 ${
                isActive ? "bg-gray-200 font-bold" : ""
              }`}
            >
              {item.icon}
              <p className="text-xl">{item.title}</p>
            </div>
          );
        })}

        {/* TWEET BUTTON */}
        <div className="py-10">
          <button className="w-full rounded-full py-3 bg-blue-500 text-white hover:bg-blue-600 transition">
            Tweet
          </button>
        </div>
      </div>

      {/* USER AREA */}
      <div className="flex items-center justify-between w-full p-2 rounded-full hover:bg-gray-100">
        
        <div className="flex items-center space-x-3" onClick={() => navigate(`/user/${localStorage.getItem("userID")}`)}>
          <Avatar
            alt="username"
         src={`https://ui-avatars.com/api/?name=${localStorage.getItem("username")}`}
          />

          <div className="flex flex-col">
            <span className="font-medium">{localStorage.getItem("username")}</span>
            <span className="opacity-70 text-sm">@{localStorage.getItem("username")}</span>
          </div>
        </div>

        {/* MENU BUTTON */}
        <Button onClick={handleClick}>
          <MoreHorizIcon />
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Navigation;
