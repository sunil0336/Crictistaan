import Header from '@/Components/Header'

export default function ProfileLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

