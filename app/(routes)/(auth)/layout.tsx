export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex justify-center items-center my-10'>{children}</div>
  )
}