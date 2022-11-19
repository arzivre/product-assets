import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";
import { env } from "../../../env/server.mjs";
import { publicProcedure, router } from "../trpc";

cloudinary.config({
  cloud_name: env.CLOUDINARY_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export const assetRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.asset.findMany();
  }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.asset.delete({ where: { id: input.id } });
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        files: z.string(),
        oldFiles: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await cloudinary.uploader.destroy(input.oldFiles);

      const result = await cloudinary.uploader.upload(input.files, {
        folder: "harisenin",
        use_filename: true,
      });

      return ctx.prisma.asset.update({
        where: { id: input.id },
        data: {
          name: result.public_id,
          path: result.secure_url,
          size: result.bytes,
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string().nullable(),
        files: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const result = await cloudinary.uploader.upload(input.files, {
        folder: "harisenin",
        use_filename: true,
      });

      return ctx.prisma.asset.create({
        data: {
          name: input.name ? input.name : result.public_id,
          path: result.secure_url,
          size: result.bytes,
        },
      });
    }),
});
