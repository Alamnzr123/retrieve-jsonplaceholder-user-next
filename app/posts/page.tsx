'use client'

import React from "react";
import axios from "axios";
import Header from "../../components/Header";
import { Spinner } from "flowbite-react";
import Link from 'next/link'

interface MyObject {
  id: number;
  title: string;
  body: string;
}

export default function Posts() {
  const [data, setData] = React.useState < MyObject[] > ([]);

  const onSearchHandler = (text: string) => {
    if (text.length !== 0 && text.trim() !== '') {
      setData(data.filter(note => note.title.toLowerCase().includes(text.toLowerCase())))
    } else {
      setData(data)
    }
  }

  function onSelectionChange(e: any) {
    const sortDirection = e.target.value;
    const copyArray = [...data];

    copyArray.sort((a, b) => {
      return sortDirection === "0" ? a.id - b.id : b.id - a.id;
    });
    setData(copyArray);
  }

  async function rendering() {
    await axios.get("https:jsonplaceholder.typicode.com/posts")
      .then((response: any) => {
        console.log(response.data);
        return setData(response.data);
      })
  }

  React.useEffect(() => {
    rendering();
  }, []);

  return (
    <>
        <Header onSearch={onSearchHandler}/>
      {data.length > 0 ? (
        data.map((data) => (
          <div key={data.id}>
            <Spinner aria-label="Default status example" />

            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="ms-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden">
              <span className="sr-only">Open sidebar</span>
              <svg className="size-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </button>

            <aside id="default-sidebar" className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0" aria-label="Sidebar">
              <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                  <li>
                    <a href="#" className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                      <svg className="size-5 shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http:www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                      </svg>
                      <Link className="ms-3 flex-1 whitespace-nowrap" href="/">Users</Link>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                      <svg className="size-5 shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http:www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                      </svg>
                      <Link className="ms-3 flex-1 whitespace-nowrap" href="/posts">Data Post</Link>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                      <svg className="size-5 shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http:www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                      </svg>
                      <Link className="ms-3 flex-1 whitespace-nowrap" href="/login">Sign In</Link>
                    </a>
                  </li>
                </ul>
              </div>
            </aside>

            <div className="p-4 sm:ml-64">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                  <th scope="col" className="px-6 py-3">
                    <select defaultValue={0} onChange={onSelectionChange}>
                      <option value={0}>Ascending</option>
                      <option value={1}>Descending</option>
                    </select>
                  </th>
                    <th scope="col" className="px-6 py-3">
                      Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Body
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {data.id}
                    </th>
                    <td className="px-6 py-4">
                      {data.id}
                    </td>
                    <td className="px-6 py-4">
                      {data.title}
                    </td>
                    <td className="px-6 py-4">
                      {data.body}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )
        )) : (
        <div className="flex h-screen items-center justify-center">
          <Spinner size="xl" />
        </div>

      )}
    </>

  )

}