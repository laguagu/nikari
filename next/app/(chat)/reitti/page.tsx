// "use client";
// // Search params example
// import { useCallback, type ChangeEvent } from "react";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";

// const options = ["mew", "mewtwo", "pikachu"];

// export default function DropDown({ selected }: { selected: string }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const createQueryString = useCallback(
//     (name: string, value: string) => {
//       const params = new URLSearchParams(searchParams.toString());
//       params.set(name, value);
//       console.log(params.toString(), "params");
//       return params.toString();
//     },
//     [searchParams]
//   );

//   const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
//     // now you got a read/write object
//     const current = new URLSearchParams(searchParams.toString());

//     // update as necessary
//     const value = event.target.value.trim();

//     if (!value) {
//       current.delete("selected");
//     } else {
//       current.set("selected", event.target.value);
//     }

//     // cast to string
//     const search = current.toString();
//     // or const query = `${'?'.repeat(search.length && 1)}${search}`;
//     const query = search ? `?${search}` : "";

//     router.push(`${pathname}${query}`);
//   };

//   return (
//     <div>
//       <select value={selected} onChange={onSelect}>
//         <option value="">None</option>
//         {options.map((opt) => (
//           <option key={opt} value={opt}>
//             {opt}
//           </option>
//         ))}
//       </select>
//       <button
//         onClick={() => {
//           // <pathname>?sort=asc
//           router.push(pathname + "?" + createQueryString("sort", "asc"));
//         }}
//       >
//         Query reitti
//       </button>
//       <Link href={{ pathname: pathname + "/3" }}>Dynaaminen reitti</Link>
//     </div>
//   );
// }
