import { Router, Request, Response, NextFunction } from "express";
import {
  getHotels,
  getHotelById,
  searchAccommodations,
} from "../controllers/hotelController";
import { schemaValidator } from "src/middlewares/schemaValidator";
import { searchSchema } from "../validation/searchSchema";
import { paginationSchema } from "../validation/paginationSchema";

const router = Router();

router.get(
  "/",
  schemaValidator(paginationSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { page = 1, pageSize = 10 } = req.query;

    try {
      const { hotels, total } = await getHotels(+page, +pageSize);

      res.status(200).json({
        status: "ok",
        body: {
          page: +page,
          pageSize: +pageSize,
          total,
          data: hotels,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/search",
  schemaValidator(searchSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { q } = req.query;

    try {
      const accommodations = await searchAccommodations(q as string);

      res.status(200).json({
        status: "ok",
        body: accommodations,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const hotel = await getHotelById(id);

    if (!hotel) {
      return res.status(404).json({
        status: "Not Found",
        message: "Hotel not found",
      });
    }

    res.status(200).json({
      status: "ok",
      body: hotel,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
