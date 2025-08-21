import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { isValidObjectId, Types} from 'mongoose';
import { Song } from "../models/song"

module.exports = function (router:Router) {
    const songRoute = router.route("/songs");
    const songIdRoute = router.route("/songs/:id");

    songRoute.get(async function (req:Request, res:Response) {
        const query = Song.find();
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
    })

    songRoute.post(async function (req:Request, res:Response) {
        const { Rtitle, Rartist, RreleaseYear, RalbumArt,  RisAdded, RspotifyId,  Rrating} = req.body;

        if (!Rtitle || !Rartist){
            res.status(400).json({message: "Bad Request. Must include Title and Artist.", data: {}});
            return;
        }
        try {
            const toAdd = new Song({
                title:Rtitle,
                artist:Rartist,
                releaseYear:RreleaseYear,
                albumArt:RalbumArt,
                spotifyId:RspotifyId,
                lastAppeared: RisAdded ? new Date() : undefined,
                timesAppeared: !RisAdded ? 0 : 1,
                rating: !Rrating ? NaN : Rrating,
            });

            const savedSong = await toAdd.save();
            res.status(201).json({message: "Song added", data: savedSong});
        }
        catch (err){
            res.status(500).json({message: "Internal Server Error.", data: {}})
        }
        
    })

    songIdRoute.get(async function (req:Request, res:Response) {
        
    })

    songIdRoute.put(async function (req:Request, res:Response) {
        
    })

    songIdRoute.delete(async function (req:Request, res:Response) {
        
    })
    return router;
}