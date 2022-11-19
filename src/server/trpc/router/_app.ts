import { router } from "../trpc";
import { assetRouter } from "./asset";
import { categoryRouter } from "./category";
import { productRouter } from "./product";
import { productAssetRouter } from "./product-asset";

export const appRouter = router({
  productAsset: productAssetRouter,
  asset: assetRouter,
  product: productRouter,
  category: categoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
