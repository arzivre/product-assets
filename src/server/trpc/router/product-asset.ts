import { z } from "zod";
import { slugify } from "../../../utils/slugify";

import { router, publicProcedure } from "../trpc";
import { v2 as cloudinary } from "cloudinary";
import { env } from "../../../env/server.mjs";
import { describe } from "node:test";

cloudinary.config({
  cloud_name: env.CLOUDINARY_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export const productAssetRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.productAsset.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.number(),
        category: z.string(),
        description: z.string(),
        files: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const uploader = async (file: string) => {
        return await cloudinary.uploader.upload(file, {
          folder: "harisenin",
          use_filename: true,
        });
      };

      const inTheCloud = [];
      const files = input.files;

      for (const file of files) {
        const result = await uploader(file);
        inTheCloud.push({
          name: result.public_id,
          path: result.secure_url,
          size: result.bytes,
          category: input.category,
        });
      }

      // const assets = await ctx.prisma.asset.createMany({
      //   data: inTheCloud,
      // });

      return ctx.prisma.productAsset.create({
        data: {
          product_id: {
            create: {
              product_name: input.name,
              product_slug: slugify(input.name),
              price: input.price,
              description: input.description,
            },
          },
          asset_id: {
            create: [
              { name: "", size: 1213, path: "sd" },
              { name: "", size: 1213, path: "sd" },
            ],
          },
        },
        include: {
          product_id: true,
          asset_id: true,
        },
      });
      // return assets;
    }),
});
