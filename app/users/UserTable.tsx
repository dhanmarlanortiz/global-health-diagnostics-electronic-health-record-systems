import React from 'react'
import { sort } from "fast-sort";
import Link from 'next/link';

interface User {
  organization: any;
  id: number;
  username: string;
  email: string;
  role: number;
  isActive: number;
  organizationId: number;
}

interface Props {
  sortOrder: string;
}

const UserTable = async ({ sortOrder }: Props) => {
    const res = await fetch(
        "http://localhost:3000/api/users",
        { cache: "no-store" }
    );
    const users: User[] = await res.json();
        
    let sortedUsers = sort(users).asc((user) => user.id);

    if(sortOrder === "username") {
        sortedUsers = sort(users).asc((user) => user.username)
    } else if(sortOrder === "email") {
        sortedUsers = sort(users).asc((user) => user.email)
    } else if(sortOrder === "role") {
        sortedUsers = sort(users).asc((user) => user.role)
    } else if(sortOrder === "isActive") {
        sortedUsers = sort(users).asc((user) => user.isActive)
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
        <>
        <div className="bg-slate-50 dark:bg-slate-800/25 not-prose overflow-hidden relative rounded-xl">
            <div className="[mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] absolute bg-grid-slate-100 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))] dark:bg-grid-slate-700/25 inset-0" ></div>
                <div className="relative rounded-xl overflow-auto">
                    <div className="shadow-sm overflow-hidden my-8">
                        <table className="border-collapse table-auto w-full text-sm">
                            <thead>
                                <tr>
                                    <th className={tStyle.thL}>
                                        <Link className='font-normal' href="/users?sortOrder=username">Username</Link>
                                    </th>
                                    <th className={tStyle.thM}>
                                        <Link className='font-normal' href="#">Organization</Link>
                                    </th>
                                    <th className={tStyle.thM}>
                                        <Link className='font-normal' href="/users?sortOrder=email">Email</Link>
                                    </th>
                                    <th className={tStyle.thM}>
                                        <Link className='font-normal' href="/users?sortOrder=role">Role</Link>
                                    </th>
                                    <th className={tStyle.thM}>
                                        <Link className='font-normal' href="/users?sortOrder=isActive">Status</Link>
                                    </th>
                                    <th className={tStyle.thR}>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-slate-800">
                                {sortedUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td className={tStyle.tdL}>{user.username}</td>
                                        <td className={tStyle.tdM}>{user.organization.name}</td>
                                        <td className={tStyle.tdM}>{user.email}</td>
                                        <td className={tStyle.tdM}>{user.role == 1 ? "Admin" : "Client"}</td>
                                        <td className={tStyle.tdM}>{user.isActive == 1 ? "Active" : "Inactive"}</td>
                                        <td className={tStyle.tdR}>
                                            <div className='flex justify-end gap-x-2'>
                                                <Link href={'/users/' + user.id}
                                                    className='btn btn-info btn-sm rounded text-xs normal-case text-white'>
                                                    View
                                                </Link>
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
        </>
    )
}

export default UserTable