import React, { Suspense } from 'react'
import Link from 'next/link'
import OrgTable from './OrgTable'

interface Props {
    searchParams: { sortOrder: string }
}

const OrgPage = async ({ searchParams: { sortOrder } }: Props) => {
    return (
    <>
    <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Organizations</h1>
                    <div className="text-xs breadcrumbs p-0 text-gray-800">
                        <ul>
                            <li><Link href="/">Home</Link></li> 
                            <li>Organizations</li> 
                        </ul>
                    </div>
                </div>
                <div>
                    <Link href="/organizations/add" className="btn btn-success hover:bg-green-600 rounded text-white normal-case">Add organization</Link>
                </div>
            </div>
            
        </div>
    </header>
    
    <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
        <Suspense fallback={<p>Loading...</p>}> 
            <OrgTable sortOrder={sortOrder} />
        </Suspense>
    </div>
    </>
    )
}

export default OrgPage