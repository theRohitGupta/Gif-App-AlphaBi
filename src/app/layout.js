import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/services/AuthProvider'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gif-App AlphaBi',
  description: 'Generated by Rohit Gupta',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <AuthProvider>
        <Toaster/>
          {children}
        </AuthProvider>
      </body> 
    </html>
  )
}
