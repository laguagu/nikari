import { Button } from "./button";
import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function HomeButton() {
  return (
    <div>
      <Link href={"/"}>
        <Button variant={"outline"} className="font-semibold">
          <HomeIcon className="w-5 mr-2 " />
          Home
        </Button>
      </Link>
    </div>
  );
}
