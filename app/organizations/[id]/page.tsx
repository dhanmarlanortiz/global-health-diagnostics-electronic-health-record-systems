import React from 'react'
import Link from 'next/link';


interface Props {
  params: { id: number }
}

const OrgDetailPage = async ({ params: { id } }: Props) => {
    const res = await fetch(`http://localhost:3000/api/org/${id}`,{ cache: "no-store" });
    const org = await res.json();

    return (
        <>
        <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Profile</h1>
                <div className="text-xs breadcrumbs p-0 text-gray-800">
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/organizations">Organizations</Link></li>
                        <li>Profile</li>
                    </ul>
                </div>
            </div>
        </header>
        <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
            <div className="mx-auto my-5 space-y-12 bg-white shadow-sm p-10 rounded-lg">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-base font-semibold leading-7 text-gray-900">Organization Information</h3>
                        {/* <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{user.role == 1 ? "Admin" : "Client" } details and account access..</p> */}
                    </div>
                    <div>
                        <Link href="#" className="btn normal-case">Edit</Link>
                    </div>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Organization Name</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{org.name }</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Office Address</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{org.address}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Email Address</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{org.email}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Phone Number</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{org.phone}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
        </>
    )
}

export default OrgDetailPage