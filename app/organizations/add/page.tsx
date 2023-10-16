'use client'

import { FieldValues, useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from 'next/link'
import React from 'react'

const schema = z.object({
    name: z.string().min(1, { message: "Username is required." }),
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Enter a valid email address" }),
    phone: z.string().min(1, { message: "Phone number is required." }),
    address: z.string().min(1, { message: "Office address is required." })
});

type FormData = z.infer<typeof schema>;

let connection = {
    status: 0
}

const AddOrg = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({ resolver: zodResolver(schema) });

    const onSubmit = async (data: FieldValues) => {
        console.log(data)
        const res = await fetch('/api/addOrg', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        connection.status = res.status;

        if(res.status == 200) {
            router.push("/organizations")
        }
    }

    const styleName = {
        input: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
        label: "block text-sm font-medium leading-6 text-gray-900",
        buttonPrimary: "rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
        buttonLink: "text-sm font-semibold leading-6 text-gray-900",
        textError: "mt-2 text-red-400 text-xs"
    }

  return (
    <>
        <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Add Organization</h1>
                <div className="text-xs breadcrumbs p-0 text-gray-800">
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/organizations">Organizations</Link></li>
                        <li>Add organization</li>
                    </ul>
                </div>
            </div>
        </header>
        <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
            <div className="mx-auto my-5 space-y-12 bg-white shadow-sm p-10 rounded-lg">
            <form className="max-w-3xl mx-auto" onSubmit={ handleSubmit(onSubmit) }>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <div className="space-y-12 w-full">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Add new organization profile</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600"></p>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="name" className={styleName.label}>Organization Name</label>
                                    <div className="mt-2">
                                        <input { ...register('name')} id="name" type="text" className = {styleName.input} />
                                        {errors.name && <p className={styleName.textError}>{errors.name.message}</p>}
                                        {connection.status == 400 && <p className={styleName.textError}>Name is already taken.</p>}
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="email" className={styleName.label}>Email Address</label>
                                    <div className="mt-2">
                                        <input {...register("email")} id="email" type="email" className = {styleName.input} />
                                        {errors.email && <p className={styleName.textError}>{errors.email.message}</p>}
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="phone" className={styleName.label}>Telephone Number</label>
                                    <div className="mt-2">
                                        <input { ...register('phone')} id="phone" type="number" className = {styleName.input} />
                                        {errors.phone && <p className={styleName.textError}>{errors.phone.message}</p>}
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="address" className={styleName.label}>Office Address</label>
                                    <div className="mt-2">
                                        <input { ...register('address')} id="address" type="text" className = {styleName.input} />
                                        {errors.address && <p className={styleName.textError}>{errors.address.message}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Link href="/organizations" className={styleName.buttonLink}>Cancel</Link>
                    <button /*disabled={!isValid}*/  type="submit" className={styleName.buttonPrimary}>Save</button>
                </div>
            </form>
            </div>
        </div>
    </>
  )
}

export default AddOrg