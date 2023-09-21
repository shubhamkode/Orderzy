import { getUserSession } from "@/features/lib/getUserSession";
import { GetItemById } from "@/features/lib/providers/ItemProvider";
import { ItemDescriptionPageTemplate } from "@/templates";

export default async function ItemDescriptionPage({
  params,
}: {
  params: { itemId: string };
}) {
  const item = await getUserSession().then(async (data) => {
    return await GetItemById(params.itemId, data.id);
  });

  return <ItemDescriptionPageTemplate item={item} />;
}
