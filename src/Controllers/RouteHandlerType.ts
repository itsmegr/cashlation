import { NextFunction, Request, Response } from "express";
type RouteHandler = (req: Request, res: Response, next: NextFunction) => void;

export default RouteHandler;
