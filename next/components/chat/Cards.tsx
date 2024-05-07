import { CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Cards() {
  return (
    <div className="flex flex-col items-center px-4 md:px-6 py-4 md:py-8 ">
      <div className="flex flex-col gap-4 max-w-2xl w-full mx-auto">
        {/* Kortit täällä */}
        <Card className="hoverEffect shadow-md bg-gray-50">
          <CardContent className="flex flex-col items-center justify-center p-8 ">
            <h3 className="text-xl md:text-2xl  font-semibold break-words">
              Step 1 - Take a picture
            </h3>
            {/* <p className="text-gray-500 dark:text-gray-400 mt-2">This is the content of the first card.</p> */}
          </CardContent>
        </Card>
        <Card className="hoverEffect shadow-md bg-gray-50">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <h3 className="text-xl md:text-2xl font-semibold break-words ">
              Step 2 - Review and adjust
            </h3>
          </CardContent>
        </Card>
        <Card className="hoverEffect shadow-md bg-gray-50">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <h3 className="text-xl md:text-2xl font-semibold break-words">
              Step 3 - Explore care instructions
            </h3>
          </CardContent>
        </Card>
        <Link href={"/care"}>
          <Card className="hoverEffect shadow-md border-2 border-gray-400 hover:cursor-pointer hover:border-gray-300 hover:border-2 ">
            <CardContent className="flex flex-col items-center justify-center p-8">
              <h3 className="text-xl md:text-2xl font-semibold">Get started</h3>
              <Button className="mt-4 font-semibold bg-gray-800" size="lg">
                Click Here
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
