import { Skeleton } from "@/components/ui/skeleton";

export function CameraSkeleton() {
  return (
    <div>
      <div className="flex flex-col space-y-8">
        <Skeleton className="h-52 w-96 sm:h-64 sm:w-[420px] md:h-80 md:w-[520px] lg:h-96 lg:w-[620px] rounded-xl bg-gray-300 shadow-md" />
        <div className="flex space-x-4 justify-center">
          <Skeleton className="h-8 w-24 sm:w-32 md:w-40 lg:w-48 bg-slate-700" />
          <Skeleton className="h-8 w-20 sm:w-28 md:w-36 lg:w-44 bg-slate-700" />
        </div>
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-40 w-[360px] sm:h-52 md:h-64 lg:h-72 rounded-xl bg-gray-300 shadow-md" />
        <p className="text-2xl font-semibold text-center">Identifying materials...</p>
      </div>
    </div>
  );
}