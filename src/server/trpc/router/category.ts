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

export const categoryRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.category.findMany();
  }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.category.delete({ where: { id: input.id } });
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        assetId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.category.update({
        where: { id: input.id },
        data: {
          category_name: input.name,
          category_slug: slugify(input.name),
          asset_id: input.assetId,
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        assetId: z.string(),
        files: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const result = await cloudinary.uploader.upload(input.files, {
        folder: "harisenin",
        use_filename: true,
      });
      return ctx.prisma.category.create({
        data: {
          category_name: input.name,
          category_slug: slugify(input.name),
          assetId: {
            create: {
              name: result.public_id,
              size: result.bytes,
              path: result.secure_url,
            },
          },
        },
        include: {
          assetId: true,
        },
      });
    }),
});
