import { Router, Request, Response } from 'express';
import mongoose, { isValidObjectId, Types} from 'mongoose';
import { Song } from "../models/song"
import { Day } from "../models/day"

const DaysRouter = function (router:Router) {
    return router;
}

export default DaysRouter;