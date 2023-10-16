'use client'

import React from 'react'
import { sort } from "fast-sort";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Props {
  sortOrder: string;
}

const OrgTable = async ({ sortOrder }: Props) => {
    const router = useRouter();
    
    const res = await fetch(
        "http://localhost:3000/api/org",
        { cache: "no-store" }
    );
    const org: User[] = await res.json();
        
    let sortedOrg = sort(org).asc((user) => user.id);

    if(sortOrder === "name") {
        sortedOrg = sort(org).asc((user) => user.name)
    } else if(sortOrder === "address") {
        sortedOrg = sort(org).asc((user) => user.address)
    } else if(sortOrder === "email") {
        sortedOrg = sort(org).asc((user) => user.email)
    } else if(sortOrder === "phone") {
        sortedOrg = sort(org).asc((user) => user.phone)
    }

    const tStyle = {
        thL: "border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left",
        thM: "border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left",
        thR: "border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left",
        tdL: "border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400",
        tdM: "border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400",
        tdR: "border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400"
    }

    return (
    <div className="bg-slate-50 dark:bg-slate-800/25 not-prose overflow-hidden relative rounded-xl">
        <div className="[mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] absolute bg-grid-slate-100 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))] dark:bg-grid-slate-700/25 inset-0" ></div>
            <div className="relative rounded-xl overflow-auto">
                <div className="shadow-sm overflow-hidden my-8">
                    <table className="border-collapse table-auto w-full text-sm">
                        <thead>
                            <tr>
                                <th className={tStyle.thL}>
                                    <Link href="/organizations?sortOrder=name">Name</Link>
                                </th>
                                <th className={tStyle.thM}>
                                    <Link href="/organizations?sortOrder=address">Address</Link>
                                </th>
                                <th className={tStyle.thM}>
                                    <Link href="/organizations?sortOrder=email">Email</Link>
                                </th>
                                <th className={tStyle.thM}>
                                    <Link href="/organizations?sortOrder=phone">Phone</Link>
                                </th>
                                <th className={tStyle.thR}>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-slate-800">
                        {sortedOrg.map((org: {
                            name: string; id: number; phone: string; email: string; address: string;
                        }) => (
                            <tr key={org.id}>
                                <td className={tStyle.tdL}>{org.name}</td>
                                <td className={tStyle.tdM}>{org.address}</td>
                                <td className={tStyle.tdM}>{org.email}</td>
                                <td className={tStyle.tdM}>{org.phone}</td>
                                <td className={tStyle.tdR}>
                                    <div className='flex justify-end gap-x-2'>
                                        <button 
                                            onClick={ () => router.push(`/organizations/${org.id}`) } 
                                            className='btn btn-info btn-sm rounded text-xs normal-case text-white'>
                                            View
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5"></div>
    </div>
    
    )
}

export default OrgTable