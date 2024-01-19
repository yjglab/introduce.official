export default function PageContainer({
  children,
  pageName,
}: {
  children: React.ReactNode;
  pageName: string;
}) {
  return (
    <main id={pageName} className='max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-20'>
      {children}
    </main>
  );
}
