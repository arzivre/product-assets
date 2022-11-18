import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";
import { env } from "../../../env/server.mjs";
import { slugify } from "../../../utils/slugify";
import { publicProcedure, router } from "../trpc";

cloudinary.config({
  cloud_name: env.CLOUDINARY_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export const productAssetRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.productAsset.findMany({
      include: { product_id: true, asset_id: true },
    });
  }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        price: z.number(),
        category: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // TODO: feature update image
      return ctx.prisma.productAsset.update({
        where: { id: input.id },
        data: {
          product_id: {
            update: {
              product_name: input.name,
              product_slug: slugify(input.name),
              price: input.price,
              description: input.description,
            },
          },
        },
      });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.productAsset.delete({ where: { id: input.id } });
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
        });
      }

      await ctx.prisma.asset.createMany({
        data: inTheCloud,
      });

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
            create: inTheCloud,
          },
        },
        include: {
          product_id: true,
          asset_id: true,
        },
      });
    }),
});
