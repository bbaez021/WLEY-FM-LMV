import { Router, Request, Response } from 'express';
import mongoose, { isValidObjectId, mongo } from 'mongoose';
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

        const existing = await Song.findOne({$or: [{spotifyId: {$eq: RspotifyId}}, 
                                                   {$and: [{title:Rtitle}, {artist:Rartist}]}]})
                                   .collation({ locale: 'en', strength: 2 });;

        if (existing){
            res.status(400).json({message: "Song Already Exists", data: {}});
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
                timesAppeared: RisAdded ? 1 : 0,
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
        try{
            const song_id = req.params["id"];
            const u_id = mongoose.Types.ObjectId.isValid(song_id);
            //console.log("CONVERTING TO OBJECT_ID");
            try {
                //console.log("FIND STARTED");
                const result = await Song.findOne({_id:u_id});
                //console.log(result);
                if (result){
                    res.status(200).json({message: "Song found", data:result[0]})
                }
                else{
                    res.status(404).json({message: "Song not found",
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
    })

    songIdRoute.put(async function (req:Request, res:Response) {
        
    })

    songIdRoute.delete(async function (req:Request, res:Response) {
        
    })
    return router;
}