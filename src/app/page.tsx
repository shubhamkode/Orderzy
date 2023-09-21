import { getUserSession } from "@/features/lib/getUserSession";
import { GetAllItemsByUserId } from "@/features/lib/providers/ItemProvider";
import { HomePageTemplate } from "@/templates";

export default async function HomePage() {
  const user = await getUserSession();
  const allItems = await GetAllItemsByUserId(user.id);

  return <HomePageTemplate items={allItems} userId={user.id} />;
}
