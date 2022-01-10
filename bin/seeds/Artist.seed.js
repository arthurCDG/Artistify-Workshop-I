// const mongoose = require("mongoose")
require("dotenv").config();
require("../../db/dbInit");

const artistModel = require("./../../models/Artist.model")

const artists = [
    {
        name: "The Beatles",
        isBand: true,
        description: "The Beatles were an English rock band formed in Liverpool in 1960, whose best-known line-up comprised John Lennon, Paul McCartney, George Harrison and Ringo Starr.",
        picture: "https://upload.wikimedia.org/wikipedia/commons/d/df/The_Fabs.JPG"
    },
    {
        name: "Dire Straits",
        isBand: true,
        description: "Dire Straits were a British rock band formed in London in 1977 by Mark Knopfler (lead vocals and lead guitar), David Knopfler (rhythm guitar and backing vocals), John Illsley (bass guitar and backing vocals) and Pick Withers (drums and percussion). They were active from 1977 to 1988 and again from 1991 to 1995.",
        picture: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Dire_straits_22101985_23_800.jpg"
    },
    {
        name: "Bob Marley",
        isBand: false,
        description: "Robert Nesta Marley OM (6 February 1945 – 11 May 1981) was a Jamaican singer, songwriter, and musician. Considered one of the pioneers of reggae, his musical career was marked by fusing elements of reggae, ska, and rocksteady, as well as his distinctive vocal and songwriting style.[2][3] Marley's contributions to music increased the visibility of Jamaican music worldwide, and made him a global figure in popular culture for over a decade.",
        picture: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Bob-Marley.jpg"
    }
]

const createArtists = async function () {
    try {
        const { deletedCount } = await artistModel.deleteMany();
        console.log(`success : ${deletedCount} artists deleted from database !`);
        const res = await artistModel.insertMany(artists);
        // const res = await artistModel.create(artists);
        console.log(`success : ${res.length} artists in database !`);
        process.exit();
        // equivalent à mongoose.connection.close();
        // equivalent à mongoose.disconnect();
    } catch (error) {
        console.error(error);
    }
};

createArtists()