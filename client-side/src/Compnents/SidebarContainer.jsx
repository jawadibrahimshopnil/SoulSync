import { createContext, useState } from "react"
import { FaBars } from "react-icons/fa"

export const SidebarContext = createContext()

export default function SidebarContainer({ headingIcon, heading, children }) {
  const [expanded, setExpanded] = useState(true)

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r">
        <div className="p-4 pb-2 flex justify-between items-center border-b-2">
          {headingIcon}
          <span className={`bg-gradient-to-tr from-orange-400 to-rose-600 text-transparent bg-clip-text self-center text-2xl font-bold whitespace-nowrap ${
              expanded ? "w-32" : "hidden"
            }`}>{heading}</span>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            <FaBars className="w-5 h-5"></FaBars>
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
        
      </nav>
    </aside>
  )
}

