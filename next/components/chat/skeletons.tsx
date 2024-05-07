import { Skeleton } from "@/components/ui/skeleton";
import { ThreeDots } from "react-loader-spinner";
export function CameraSkeleton() {
  return (
    <div>
      <div className="flex flex-col space-y-8">
        <Skeleton className="h-72 min-w-[350px] sm:h-72 md:h-80 md:w-[520px] lg:h-96 lg:w-[620px] rounded-xl bg-gray-300 shadow-md" />
        <div className="flex space-x-4 justify-center">
          <Skeleton className="h-8 w-32 sm:w-32 md:w-40 lg:w-48 bg-slate-700" />
          <Skeleton className="h-8 w-28 sm:w-28 md:w-36 lg:w-44 bg-slate-700" />
        </div>
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-80 w-[339px] sm:min-w-[375px] rounded-xl bg-gray-300 shadow-md" />
        <div className="item-c">
          <span className="text-2xl font-semibold text-center flex items-center justify-center gap-3">
            Identifying materials
            <ThreeDots height="56" width="56" color="" />
          </span>
        </div>
      </div>
    </div>
  );
}
