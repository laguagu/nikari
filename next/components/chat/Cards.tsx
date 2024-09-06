import { CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Cards() {
  return (
    <div className="flex flex-col items-center px-4 md:px-6 py-8 md:py-12 bg-white rounded-lg">
      <div className="flex flex-col gap-6 max-w-2xl w-full mx-auto">
        <Card className="shadow-sm bg-gray-50 hover:shadow-md transition-shadow duration-300 border border-gray-100">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <h3 className="text-lg md:text-xl font-normal text-gray-800 mb-2">
              Step 1
            </h3>
            <span className="text-base text-gray-600">Take a picture</span>
          </CardContent>
        </Card>
        <Card className="shadow-sm bg-gray-50 hover:shadow-md transition-shadow duration-300 border border-gray-100">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <h3 className="text-lg md:text-xl font-normal text-gray-800 mb-2">
              Step 2
            </h3>
            <span className="text-base text-gray-600">Review and adjust</span>
          </CardContent>
        </Card>
        <Card className="shadow-sm bg-gray-50 hover:shadow-md transition-shadow duration-300 border border-gray-100">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <h3 className="text-lg md:text-xl font-normal text-gray-800 mb-2">
              Step 3
            </h3>
            <span className="text-base text-gray-600">
              Explore care instructions
            </span>
          </CardContent>
        </Card>
        <Link href={"/care"} className="w-full">
          <Card className="shadow-sm bg-gray-100 hover:bg-gray-200 transition-colors duration-300 border border-gray-200 cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <h3 className="text-lg md:text-xl font-normal text-gray-800 mb-4">
                Get started
              </h3>
              <Button
                className="mt-2 font-normal bg-gray-700 hover:bg-gray-800 text-white transition-colors duration-300"
                size="lg"
              >
                Click here
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
