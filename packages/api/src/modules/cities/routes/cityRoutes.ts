import { Router, Request, Response, NextFunction } from "express";
import { getCityById } from "../controllers/cityController";

const router = Router();

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  
  try {
    const city = await getCityById(id);
    
    if (!city) {
      return res.status(404).json({
        status: 'Not Found',
        message: 'City not found',
      });
    }
    
    res.status(200).json({
      status: 'ok',
      body: city,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
