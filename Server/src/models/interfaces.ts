import { NextFunction, Response, Request } from "express";

export interface Controller {
  (req: Request, res: Response, next: NextFunction): void;
}

export interface Categories {
  idcategories: number;
  name: string;
}
