import { useContext } from "react"
import { SidebarContext } from "./SidebarContainer"
import { NavLink } from "react-router-dom"

export function SidebarItem({ onClick, icon, text, to }) {
    const { expanded } = useContext(SidebarContext);

    return (
        <NavLink onClick={onClick}
            to={to}
            className={`
          relative flex justify-center items-center SSBtnOutline my-3
          font-medium rounded-md cursor-pointer
            `}
        >
            {icon}
            <span
                className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "hidden"
                    }`}
            >
                {text}
            </span>
        </NavLink>
    )
}