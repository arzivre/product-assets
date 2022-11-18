import { router } from "../trpc";
import { exampleRouter } from "./example";
import { productAssetRouter } from "./product-asset";

export const appRouter = router({
  example: exampleRouter,
  productAsset: productAssetRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
