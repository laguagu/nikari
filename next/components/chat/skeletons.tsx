import { Skeleton } from "@/components/ui/skeleton";

export function CameraSkeleton() {
  return (
    <div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-52 w-96 sm:h-64 sm:w-[400px] md:h-80 md:w-[500px] lg:h-96 lg:w-[600px] rounded-xl bg-gray-300 shadow-md" />
        <div className="flex space-x-4 justify-center">
          <Skeleton className="h-5 w-24 sm:w-32 md:w-40 lg:w-48 bg-slate-700" />
          <Skeleton className="h-5 w-20 sm:w-28 md:w-36 lg:w-44 bg-slate-700" />
        </div>
      </div>
    </div>
  );
}