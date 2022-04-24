import Link from 'next/link'
import React from 'react'
import { useServersQuery } from '../../graphql'

const Servers = () => {
  const [active, setActive] = React.useState(false)

  const [{ data }] = useServersQuery()

  return (
    <ul>
      {data?.servers?.map((server) => (
        <div key={server.id}>
          <li className={`hover:${() => setActive(!active)}`}>
            <Link href={`/servers/${server.id}`}>
              <div className="server-icon p-5 w-16 my-3 m-auto bg-gray-900 text-gray-100 hover:bg-gray-800 transition-all duration-300 cursor-pointer select-none">
                <div className="relative flex justify-center items-center mx-auto">
                  {/* Server Icon */}
                  {server.name.charAt(0)}
                </div>
              </div>
            </Link>
          </li>
        </div>
      ))}
    </ul>
  )
}

export default Servers
