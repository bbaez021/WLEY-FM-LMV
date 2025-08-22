import { Router, Request, Response } from 'express';
import mongoose, { isValidObjectId, Types} from 'mongoose';
import { Song } from "../models/song"
import { Day } from "../models/day"

const DaysRouter = function (router:Router) {

    router.get("/", async function (req:Request, res:Response) {
        const query = Day.find();
        if (req.query["where"]){
            query.where(JSON.parse(req.query["where"]));
        }
        if (req.query["sort"]) {
            query.sort(JSON.parse(req.query["sort"]));
        }
        if (req.query["select"]){
            query.select(JSON.parse(req.query["select"]));
        }
        if (req.query["skip"]){
            query.skip(JSON.parse(req.query["skip"]));
        }
        if (req.query["limit"]){
            query.limit(JSON.parse(req.query["limit"]));
        }

        if (req.query["count"]){
            if (req.query['count'] === "true" || req.query["count"] === true) {
                query.countDocuments();
            } 
        }

        try{
            const result = await query.exec();
            res.status(200).json({message:"OK", data:result});

        }
        catch (err) {
            res.status(500).json({message:"Internal Server Error", data:err});
        }
    });

    router.post("/", async function (req:Request, res:Response){
        const { rDayId, risNoon, rSongs} = req.body;
        try{
            const toAdd = new Day ({
                DayId:rDayId,
                isNoon:risNoon,
                songs:rSongs
            });

            const result = await toAdd.save();
            res.status(201).json({message: "Date created",
                                  data: result});
        }
        catch (err){
            res.status(500).json({message: "Internal Server Error",
                                data: {}});
       }        
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