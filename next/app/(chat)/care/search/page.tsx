"use client"
import { useSearchParams } from "next/navigation";
import { careInstructions } from "@/lib/hoitoOhjeet";
import { MaterialCareInstructions } from "@/lib/definition";
import CareGuides from "@/components/chat/CareGuides";
import Link from 'next/link'
import Image from 'next/image'
import photos from '@/lib/photos'

function Page() {
  const [searchParams] = useSearchParams();
  const material = searchParams ? searchParams[1] : null;
  const materials = material ? material.split(",") : [];

  const careGuides = materials.map((material: string) => {
    const key = material as keyof MaterialCareInstructions;
    return {
      material: key,
      instructions: careInstructions[key],
    };
  });
  
  return (
    <div >
      <CareGuides careGuides={careGuides} />
      <section className='mt-12'>
      <div className='container'>
        <h1 className='font-serif text-3xl font-bold text-gray-700'>Photos</h1>

        <ul className='mt-10 grid auto-rows-max grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {photos.map(({ id, imageSrc }) => (
            <li key={id}>
              <Link href={`/care/search/photos/${id}`}>
                <Image
                  alt=''
                  src={imageSrc}
                  height={500}
                  width={500}
                  className='aspect-square w-full rounded-xl object-cover'
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
    </div>
  );
}

export default Page;