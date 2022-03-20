const { MongoClient } = require('mongodb');

async function connectDatabase() {
    const uri = "mongodb+srv://businessDirSysAdmin:cYmACq0vr704SLbN@cluster0.4kjcl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

    const client = new MongoClient(uri);

    try {
        await client.connect();

        // Add a business into the database (Example)
        // await addBusiness(client, {
        //     name: "Tom's Pizzeria",
        //     categories: ["Restaurant", "Italian", "Pizza", "Dine-In", "Take-out", "Dining"],
        //     description: "A family-owned restaurant established in 1997 serving the broader Calgary area. With each bite is an authentic Italian taste that is unique only to our recipe.",
        //     contact: {
        //         website: "www.toms-pizza.com",
        //         phoneNumber: "(403) 119 2954"
        //     },
        //     location: "1212 104 Ave. SW Calgary",
        //     hours: {
        //         Mon: "10:00AM - 10:00PM",
        //         Tues: "10:00AM - 10:00PM",
        //         Wed: "10:00AM - 10:00PM",
        //         Thurs: "10:00AM - 10:00PM",
        //         Fri: "10:00AM - 10:00PM",
        //         Sat: "10:00AM - 10:00PM",
        //         Sun: "Closed"
        //     },
        //     reviews: [{
        //         name: "Maria",
        //         rating: "4.5",
        //         review: "The service was excellent and the food was delicious!"
        //     }]
        // });

        // Get business by category from the database (Example)
        await getBusinessByCategory(client, "Italian");

        // update business with name "Tom's Pizzeria"  to "Tom's Pizza" (Example)
        // await updateBusiness(client, "Tom's Pizzeria", { name: "Tom's Pizza" });

        // delete business with name "Tom's Pizzeria"
        // await deleteBusiness(client, "Tom's Pizzeria")

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

// deals with case of rejected promise
connectDatabase().catch(console.error);

// adds a single business profile as a new document into the database
async function addBusiness(client, newBusiness) {
    const result = await client.db("businessesDB").collection("businesses").insertOne(newBusiness);
}

// returns all of the documents with a matching category field from the database
async function getBusinessByCategory(client, category) {
    const cursor = client.db("businessesDB").collection("businesses").find({ categories: category });
    const results = await cursor.toArray();

    // print name for first result
    console.log(results[0].name);
}

// Find the business by its name and update the business with updatedInfo
async function updateBusiness(client, businessName, updatedInfo) {
    const result = await client.db("businessesDB").collection("businesses").updateOne({ name: businessName }, { $set: updatedInfo });
}

// Find the business by its name and delete the business
async function deleteBusiness(client, businessName) {
    const result = await client.db("businessesDB").collection("businesses").deleteOne({ name: businessName });
}