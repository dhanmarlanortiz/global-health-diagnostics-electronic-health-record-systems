import React from 'react'
import Link from 'next/link';


interface Props {
  params: { id: number }
}

const UserDetailPage = async ({ params: { id } }: Props) => {
    const res = await fetch(`http://localhost:3000/api/users/${id}`,{ cache: "no-store" });
    const user = await res.json();

    return (
        <>
        <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">User Details</h1>
                        <div className="text-xs breadcrumbs p-0 text-gray-800">
                            <ul>
                                <li><Link href="/">Home</Link></li>
                                <li><Link href="/users">Users</Link></li>
                                <li>User Details</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <Link href="/users" className="btn rounded normal-case mr-2">Back</Link>
                        <Link href="#" className="btn btn-info rounded text-white hover:bg-sky-500 normal-case">Edit Details</Link>
                    </div>
                </div>
            </div>
        </header>
        <div className='mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8'>
            <div className="">
                <div className="flex items-center">
                    <div className='relative'>
                        {user.role == 1 ? <img src="/images/picture-doctor-with-glasses-lab-coat.png" /> : <img src="/images/man-with-glasses-tie-that-says-he-is-smiling.png" /> }
                    </div>
                    <div className="bg-white shadow-sm rounded-lg py-5 px-10 pl-20 -ml-20">
                        <table className='text-left'>
                            <tbody>
                                <tr>
                                    <td className='py-3 px-5 font-semibold text-gray-500'>Username:</td>
                                    <td className='py-3 px-5 text-sm'>{user.username }</td>
                                </tr>
                                <tr>
                                    <td className='py-3 px-5 font-semibold text-gray-500'>Email adderess:</td>
                                    <td className='py-3 px-5'>{user.email }</td>
                                </tr>
                                <tr>
                                    <td className='py-3 px-5 font-semibold text-gray-500'>Role:</td>
                                    <td className='py-3 px-5'>{user.role == 1 ? "Admin" : "Client" }</td>
                                </tr>
                                <tr>
                                    <td className='py-3 px-5 font-semibold text-gray-500'>Account status:</td>
                                    <td className='py-3 px-5'>{user.isActive == 1 ? "Active" : "Inactive"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default UserDetailPage