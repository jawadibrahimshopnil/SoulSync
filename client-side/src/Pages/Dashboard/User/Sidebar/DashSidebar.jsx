import { GiDiamondRing } from "react-icons/gi";
import SidebarContainer from "../../../../Compnents/SidebarContainer";
import { SidebarItem } from "../../../../Compnents/SidebarItem";
import { FaRegAddressCard, FaRegCheckCircle } from "react-icons/fa";
import { MdLogout, MdOutlineCelebration, MdOutlineHome } from "react-icons/md";
import { BsBookmarkHeart } from "react-icons/bs";
import { TiContacts, TiEdit } from "react-icons/ti";
import { RiHeartsFill } from "react-icons/ri";
import useAuth from "../../../../Hooks/useAuth";
import useAdmin from "../../../../Hooks/useAdmin";
import { BiTachometer } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi";
import { TbCrown } from "react-icons/tb";
import Loading from './../../../../Compnents/Loading';

export function DashSidebar() {
    const { logOutUser } = useAuth();
    const [isAdmin, adminLoading] = useAdmin();

    if(adminLoading){
        return <Loading/>
    }

    return (
        <>
            <SidebarContainer
                headingIcon={<RiHeartsFill className="text-rose-600 w-6 h-6 mr-3 sm:h-9" />}
                heading={"SoulSync"}>

                <SidebarItem
                    icon={<MdOutlineHome className="SSIcon" />}
                    text={"Back to Home"} to={"/"}
                />
                {
                    isAdmin ?
                        <>
                            <SidebarItem
                                icon={<BiTachometer className="SSIcon" />}
                                text={"Dashboard"} to={"admin-home"} />

                            <SidebarItem
                                icon={<HiOutlineUsers className="SSIcon" />}
                                text={"Manage Users"} to={"manage-users"} />

                            <SidebarItem
                                icon={<TbCrown className="SSIcon" />}
                                text={"Approved Premium"} to={"approved-premium"} />

                            <SidebarItem
                                icon={<FaRegCheckCircle className="SSIcon" />}
                                text={"Contact Request"} to={"contact-request"} />

                            <SidebarItem
                                icon={<MdOutlineCelebration className="SSIcon" />}
                                text={"Success Story"} to={"success-story"} />
                        </>
                        :
                        <>
                            <SidebarItem
                                icon={<TiEdit className="SSIcon" />}
                                text={"Edit Biodata"} to={"editbio"} />

                            <SidebarItem
                                icon={<FaRegAddressCard className="SSIcon" />}
                                text={"View Biodata"} to={"viewbio"} />

                            <SidebarItem
                                icon={<TiContacts className="SSIcon" />}
                                text={"Contact Request"} to={"contactreq"} />

                            <SidebarItem
                                icon={<BsBookmarkHeart className="SSIcon" />}
                                text={"Favorite Biodata"} to={"favbio"} />

                            <SidebarItem
                                icon={<GiDiamondRing className="SSIcon" />}
                                text={"Got Married"} to={"gotmarried"} />
                        </>
                }
                <SidebarItem
                    onClick={logOutUser}
                    icon={<MdLogout className="SSIcon" />}
                    text={"Logout"} to={"/"}
                />

            </SidebarContainer>
        </>
    );
}
