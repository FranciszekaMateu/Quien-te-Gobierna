import AuthGuard from '@/components/AuthGuard'

export default function AdminLayout({ children }) {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  )
} 