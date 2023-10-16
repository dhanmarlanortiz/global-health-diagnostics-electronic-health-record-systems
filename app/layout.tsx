import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthProvider from './auth/Provider'
import NavBar from './NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  	title: 'Global Health Diagnostics EHR System',
  	description: 'Global Health Diagnostics Electronic Health Record System',
}

export default function RootLayout( {children} : {children: React.ReactNode}) {
  	return (
		<>
    	<html lang="en" className='h-full bg-gray-100'>
      		<body className={inter.className + " h-full"} >
			  	<AuthProvider>
          			<NavBar/>
					{children}
				</AuthProvider>
      		</body>
    	</html>
		</>
  )
}
