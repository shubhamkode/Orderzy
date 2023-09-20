import { GetItemById } from "@/features/lib/providers/ItemProvider";
import ItemDescriptionPageTemplate from "@/templates/ItemDescriptionTemplate";
import { getServerSession } from "next-auth";

export default async function ItemDescriptionPage({
  params,
}: {
  params: { itemId: string };
}) {
  const session = await getServerSession();
  if (!session?.user) {
    return null;
  }

  const item = await GetItemById(params.itemId, session.user.id);

  if (!item) {
    return null;
  }

  return <ItemDescriptionPageTemplate item={item} />;
}
