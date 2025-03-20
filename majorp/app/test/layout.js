import Header from '@/Components/Header'

export default function TestLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

