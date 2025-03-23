import { getGroups } from "@/actions/mailerlite/get-groups";
import { getSubscribersInGroup } from "@/actions/mailerlite/get-subscribers-in-group";
import { MailerliteStore } from "@/components/mailerlite-store";
import { Button } from "@/components/ui/button";

export const revalidate = 1;
export const dynamicParams = true;

export default async function Home() {
  const handleClick = async () => {
    "use server";

    await getGroups({
      filter: {
        name: "cfo",
      },
      sort: "-created_at",
    });

    await getSubscribersInGroup("147700792230414307", {});
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <a href={"https://cfo360.ovh/wp/#kontakt"} target={"_blank"}>
          <h1>CFO360</h1>
        </a>

        <div>
          <h2 className={"mb-2"}>mailerlite store:</h2>

          <MailerliteStore />
        </div>

        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/api/auth/login?screen_hint=signup">
          <Button>Sign up</Button>
        </a>

        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/api/auth/login">
          <Button>Log in</Button>
        </a>

        <Button onClick={handleClick}>Get groups</Button>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
