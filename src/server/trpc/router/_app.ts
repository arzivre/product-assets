import { router } from "../trpc";
import { assetRouter } from "./asset";
import { exampleRouter } from "./example";
import { productRouter } from "./product";
import { productAssetRouter } from "./product-asset";

export const appRouter = router({
  example: exampleRouter,
  productAsset: productAssetRouter,
  asset: assetRouter,
  product: productRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
