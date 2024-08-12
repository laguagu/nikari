import { CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Cards() {
  return (
    <div className="flex flex-col items-center px-4 md:px-6 py-4 md:py-8 ">
      <div className="flex flex-col gap-4 max-w-2xl w-full mx-auto">
        {/* Kortit täällä */}
        <Card className="hoverEffect shadow-md bg-white bg-opacity-60 group border-2 border-black border-opacity-35 divide-x-8">
          <CardContent className="flex flex-col items-center justify-center p-4">
            <h3 className="text-xl md:text-2xl font-semibold break-words text-gray-700 textColor">
              Step 1
            </h3>
            <span className="text-medium"> Take a picture</span>
            {/* <p className="text-gray-500 dark:text-gray-400 mt-2">This is the content of the first card.</p> */}
          </CardContent>
        </Card>
        <Card className="hoverEffect shadow-md bg-white bg-opacity-60 group border-2 border-black border-opacity-35">
          <CardContent className="flex flex-col items-center justify-center p-4">
            <h3 className="text-xl md:text-2xl font-semibold break-words text-gray-700 textColor">
              Step 2
            </h3>
            <span className="text-medium">Review and adjust</span>
          </CardContent>
        </Card>
        <Card className="hoverEffect shadow-md bg-white bg-opacity-60 group border-2 border-black border-opacity-35">
          <CardContent className="flex flex-col items-center justify-center p-4">
            <h3 className="text-xl md:text-2xl font-semibold break-words text-gray-700 textColor">
              Step 3
            </h3>
            <span className="text-medium">Explore care instructions</span>
          </CardContent>
        </Card>
        <Link href={"/care"}>
          <Card className="hoverEffect shadow-lg outline outline-2 bg-white  hover:cursor-pointer  hover:underline group ">
            <CardContent className="flex flex-col items-center justify-center p-4">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-700 textColor">
                Get started
              </h3>
              <Button
                className="mt-2 font-semibold bg-gray-800 bg-opacity-90"
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
