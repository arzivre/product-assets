import { router } from "../trpc";
import { assetRouter } from "./asset";
import { exampleRouter } from "./example";
import { productAssetRouter } from "./product-asset";

export const appRouter = router({
  example: exampleRouter,
  productAsset: productAssetRouter,
  asset: assetRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
