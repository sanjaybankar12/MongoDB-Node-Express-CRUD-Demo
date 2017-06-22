# MongoDB-Node-Express-CRUD-Demo

Requirement :

    1) MongoDB setup install
    2) NodeJS setup install

Create database 'myDb' in MongoDB by using command promt. To create database goto the MongoDB 
installation directory to bin folder. suppose your MongoDB install in C drive then write command such as

C:/mongodb/bin>mongod --directoryperdb --dbpath "C:/mongodb/data/db" --logpath "C:/mongodb/log/mongo.log" --logappend --rest --install

Now, MongoDB create databases in db folder which is in data folder and all log of MongoDB store mongo.log file.
To start MongoDB, write command as

C:/mongodb/bin>mongo

Now, MongoDB service gets started. For creating databse write command as,
>use myDb

This will not only create new database but also switch to database

Now, create collection 'emp' by using following command as,
>db.createCollection("emp");

Description :

This Application uses Express.js,MongoDB,Node.js,Handlebars.js to build CRUD Application.
Using this you can add data which store as object. Get Data shows all the data in collection and each item contains delete & update button to delete and update data from collection.

For routing and request mapping done using Express.js. There is handlebars means index.hbs files which is javascript based we can used javascript in html code very easily.

For interacting with MongoDB we can create MongoClient, So can connect MongoDB and performed operation on data.
