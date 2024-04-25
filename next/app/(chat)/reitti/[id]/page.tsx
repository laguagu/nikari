"use client";
import { usePathname, useSearchParams } from 'next/navigation';

export default function Post({params} : any) {
  const [searchParams] = useSearchParams();
  const id = searchParams ? searchParams[0] : null;
  return (
    <div>
      <h1>Post {params.id}</h1>
    </div>
  );
}