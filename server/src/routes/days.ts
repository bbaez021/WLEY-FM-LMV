import { Router, Request, Response } from 'express';
import mongoose, { isValidObjectId, Types} from 'mongoose';
import { Song } from "../models/song"
import { Day } from "../models/day"

const DaysRouter = function (router:Router) {

    router.get("/", async function (req:Request, res:Response) {

    });

    router.post("/", async function (req:Request, res:Response){

    });

    router.get("/:id", async function (req:Request, res:Response){

    });

    router.put("/:id", async function (req:Request, res:Response){

    });

    router.delete("/:id", async function (req:Request, res:Response){

    });

    return router;
}

export default DaysRouter;