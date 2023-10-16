import AddUserForm from '@/app/users/AddUserForm'
import Link from 'next/link'
import React, { Suspense } from 'react'

const AddUser =  async () => {

    /*
    const getOrganizations = await fetch(
        "http://localhost:3000/api/org",
        { cache: "no-store" }
    );

    const organizations: [] = await getOrganizations.json();
    */
    return (
    <>
        <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Add User</h1>
                <div className="text-xs breadcrumbs p-0 text-gray-800">
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/users">Users</Link></li>
                        <li>Add user</li>
                    </ul>
                </div>
            </div>
        </header>

        <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
            <div className="mx-auto my-5 space-y-12 bg-white shadow-sm p-10 rounded-lg">
                <Suspense fallback={<p>Loading...</p>}> 
                    {/* <AddUserForm organizations={organizations!} /> */}
                    <AddUserForm />
                </Suspense>
            </div>
        </div>
    </>
    )
}

export default AddUser