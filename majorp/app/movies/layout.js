import Header from '@/Components/Header'

export default function MoviesLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

