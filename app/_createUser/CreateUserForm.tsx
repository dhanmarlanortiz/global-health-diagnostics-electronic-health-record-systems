'use client'

import { FieldValues, useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from 'next/navigation'

const schema = z.object({
    username: z.string().min(1, { message: "Username is required." }),
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Enter a valid email address" }),
    password: z.string().min(1),
    role: z.string().min(1).transform((role) => parseInt(role)),
    organizationId: z.string().min(1).transform((organizationId) => parseInt(organizationId)),
});

type FormData = z.infer<typeof schema>;

let connection = {
    status: 0
}

interface Organization {
	organizations: [];
}

import React from 'react'

const CreateUserForm = ( {organizations} : Organization ) => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({ resolver: zodResolver(schema) });

    const onSubmit = async (data: FieldValues) => {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        connection.status = res.status;

        if(res.status == 200) {
            router.push('/users')
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
        <form className="max-w-3xl mx-auto" onSubmit={ handleSubmit(onSubmit) }>
            <div className="flex items-center justify-end gap-x-6">
                <div className="space-y-12 w-full">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="username" className={styleName.label}>Username</label>
                                <div className="mt-2">
                                    <input { ...register('username')} id="username" type="text" className = {styleName.input} />
                                    {errors.username && <p className={styleName.textError}>{errors.username.message}</p>}
                                    {connection.status == 400 && <p className={styleName.textError}>Username is already taken.</p>}
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="email" className={styleName.label}>Email</label>
                                <div className="mt-2">
                                    <input {...register("email")} id="email" type="email" className = {styleName.input} />
                                    {errors.email && <p className={styleName.textError}>{errors.email.message}</p>}
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="role" className={styleName.label}>Role</label>
                                <div className="mt-2">
                                    <select defaultValue={"1"} {...register("role")} id="role" className = {styleName.input} >
                                        <option value="1">Admin</option>
                                        <option value="2">Client</option>
                                    </select>
                                    <p className="mt-3 text-gray-600 text-xs"><span className="font-semibold">Admin:</span> Global Health Diagnostics employees</p>
                                    <p className="mt-1 text-gray-600 text-xs"><span className="font-semibold">Client:</span> Company HR & Admin Officer</p>
                                    {errors.role && <p className={styleName.textError}>{errors.role.message}</p>}
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="role" className={styleName.label}>Organization</label>
                                <div className="mt-2">
                                    <select defaultValue={"1"} {...register("organizationId")}  id="organizationId" className = {styleName.input} >
                                        {organizations.map( (organization: { id: number; name: string; }) => 
                                            (<option key={organization.id} value={organization.id}>{organization.name}</option>) 
                                        )}
                                    </select>
                                    {errors.role && <p className={styleName.textError}>{errors.role.message}</p>}
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="password" className={styleName.label}>Password</label>
                                <div className="mt-2">
                                    <input {...register("password")} id="password" type="password" className = {styleName.input} />
                                    {errors.password && <p className={styleName.textError}>{errors.password.message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link href="/users" className={styleName.buttonLink}>Cancel</Link>
                <button type="submit" className={styleName.buttonPrimary}>Save</button>
            </div>
        </form>
        );
    };
        
export default CreateUserForm;