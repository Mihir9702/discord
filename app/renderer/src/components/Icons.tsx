// 🍔 Menu Icon
export const MenuIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon"
      viewBox="0 0 512 512"
      width="32"
      height="32"
    >
      <title>Menu</title>
      <path
        fill="#000"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-miterlimit="10"
        stroke-width="32"
        d="M80 160h352M80 256h352M80 352h352"
      />
    </svg>
  )
}

// ❌ Close Icon
export const CloseIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon"
      viewBox="0 0 512 512"
      width="32"
      height="32"
    >
      <title>Close</title>
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
        d="M368 368L144 144M368 144L144 368"
      />
    </svg>
  )
}

// 🔍 Search Icon
export const SearchIcon: React.FC = () => {
  return (
    <svg width="24" height="24" fill="none" aria-hidden="true" className="mr-3 flex-none">
      <path
        d="m19 19-3.5-3.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <circle
        cx="11"
        cy="11"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        data-darkreader-inline-stroke=""
      ></circle>
    </svg>
  )
}
