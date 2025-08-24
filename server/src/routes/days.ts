import { Router, Request, Response } from 'express';
import mongoose, { isValidObjectId, Types} from 'mongoose';
import { Song } from "../models/song"
import { Day } from "../models/day"
import { data } from 'react-router-dom';

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
            rSongs.forEach(async element => {
                const rst = await Song.findById(element);
                if (!rst){
                    res.status(400).json( {message: "Song not found", data: {} });
                    return;
                }
            });

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
         try{
            const day_id = req.params["id"];
            const u_id = mongoose.Types.ObjectId.isValid(day_id);
            //console.log("CONVERTING TO OBJECT_ID");
            try {
                //console.log("FIND STARTED");
                const result = await Day.findOne({_id:u_id});
                //console.log(result);
                if (result){
                    res.status(200).json({message: "Day found", data:result[0]})
                }
                else{
                    res.status(404).json({message: "Day not found",
                                            data:{}});
                }
            }
            catch (err){
                res.status(500).json({message: "Internal Server Error - find Song", 
                                        data: err});
            }
        }
        catch (format_err) {
            res.status(400).json({message:"Invalid format string for field _id", 
                                    data: format_err});
        }
    });

    router.put("/:id", async function (req:Request, res:Response){
        // @TODO:
        const id = req.params.id;
        const updates = req.body;

        // Validate ID
        if(!isValidObjectId(id)) {
            res.status(400).json({ message: "Invalid Song ID", data: {} });
            return;
        }

        if (updates.user === undefined){
            res.status(403).json({ message: "Unknown user attempting to change database", data: {} });
            return;
        }

        try{

            var day = await Day.findById(id);
            if (!day){
                    res.status(404).json({ message: "Day not found", data: {} });
                    return;
            }

            if(updates.songUpdate){
                updates.rSongs.forEach(async element => {
                    const rst = await Song.findById(element);
                    if (!rst){
                        res.status(400).json( {message: "Song not found, could not update (PUT)", data: {} });
                        return;
                    }
                });
                day.Songs = updates.rSongs;
            }
            if (updates.dateId){
                day.DayId = updates.dateId;
            }

            if (!(updates.isNoon === undefined)){
                day.isNoon = updates.isNoon;
            }
            const result = await day.save();
            res.status(200).json({ message: "Date updated", data: result});

        }
        catch (err) {
            res.status(500).json({ message: "Internal Server Error - POST (Day)", data: {} });
            return;
        }

    });

    router.delete("/:id", async function (req:Request, res:Response){
        const id = req.params.id;
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                res.status(400).json({message: "Invalid format string for field _id",
                                        data: {}});
            }
            const result = await Day.findByIdAndDelete(id);
            if (!result) {
                res.status(404).json({message: "Day not found", data:{}});
            }
            else{
                res.status(200).json({message: "Day deleted", data: result});
            }
        }
        catch (err){
            res.status(500).json({message: "Internal Server Error", 
                                    data: {}});
        }
    });

    return router;
}

export default DaysRouter;