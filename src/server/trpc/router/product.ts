import { z } from "zod";
import { slugify } from "../../../utils/slugify";
import { publicProcedure, router } from "../trpc";

export const productRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.product.findMany();
  }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.product.delete({ where: { id: input.id } });
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        price: z.number(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.product.update({
        where: { id: input.id },
        data: {
          product_name: input.name,
          product_slug: slugify(input.name),
          price: input.price,
          description: input.description,
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.number(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.product.create({
        data: {
          product_name: input.name,
          product_slug: slugify(input.name),
          price: input.price,
          description: input.description,
        },
      });
    }),
});
