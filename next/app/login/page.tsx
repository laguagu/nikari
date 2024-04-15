import { permanentRedirect } from "next/navigation";
import { getSession, login, logout } from "@/lib/basicAuth";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function Page() {
  const session = await getSession();
  if (session) {
    console.log("Login successful");
    permanentRedirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-300 p-6">
      <section className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-3">
        <h1 className="text-xl font-bold mb-6">Login</h1>
        <form
          action={async (formData) => {
            "use server";
            await login(formData);
            revalidatePath("/login");
          }}
        >
          <div className="space-y-1">
            <Input type="email" name="email" placeholder="Email" />
            <Input type="password" name="password" placeholder="Password" />
          </div>
          <br />
          <Button type="submit">Login</Button>
        </form>

        <form
          action={async () => {
            "use server";
            await logout();
          }}
        >
          <Button type="submit">Logout</Button>
        </form>
        {session ? (
          <p>
            You are logged in as {session.user.name} ({session.user.email}).
            {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
          </p>
        ) : (
          <p>You are not logged in.</p>
        )}
      </section>
    </div>
  );
}
