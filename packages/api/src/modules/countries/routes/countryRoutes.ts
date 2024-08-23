import { Router, Request, Response, NextFunction } from "express";
import { getCountryById } from "../controllers/countryController";

const router = Router();

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const country = await getCountryById(id);
    
    if (!country) {
      return res.status(404).json({
        status: 'Not Found',
        message: 'Country not found',
      });
    }
    
    res.status(200).json({
      status: 'ok',
      body: country,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
