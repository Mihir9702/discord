import React from 'react'

const Servers = () => {
  const serverNames = [
    'Ciera',
    'Illysia',
    'Kami',
    'Diza',
    'Philos',
    'Amora',
    'Neo',
    'Gyru',
    'Helta',
    'Luna',
    'Millies',
    'Opal',
    'Pheobe',
  ]

  return (
    <ul className="bg-background text-text p-[1.25rem]">
      {serverNames.map((name) => (
        <li key={name}>
          <div className="p-5 w-16 my-3 m-auto bg-dark hover:bg-gray-900 group rounded-3xl hover:rounded-lg transition-all duration-300 cursor-pointer">
            <div className="flex justify-center items-center mx-auto">
              {name.charAt(0)}
              <span className="hidden absolute ml-32 group-hover:inline">{name}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Servers
