# myFlixApp

Resources:
- https://twm.me/correct-way-to-use-mongoose/
- https://www.techcress.com/mongoose-js-query-cheatsheet/
https://www.opentechguides.com/how-to/article/mongodb/118/mongodb-cheatsheat.html

# Heroku
## Heroku CLI:
- Live: https://sheltered-lowlands-58978.herokuapp.com/
- Push to heroku: `git push heroku master`
- to rename app name via terminal: `heroku apps:rename my-flix-db-11209 --app sheltered-lowlands-58978`

# MongoDB

## https://careerfoundry.com/en/steps/nonrelational-databases#task
- Export json from local mongod to you app root dir.
`mongoexport -d myFlixDB -c movies -o movies.json`
`mongoexport -d myFlixDB -c users -o users.json`

## https://careerfoundry.com/en/steps/ethics-data-security#uploading-your-database-to-mongodb-atlas
- imports exported json from local to cloud mongodb atlas server
`mongoimport --host Cluster0-shard-0/cluster0-shard-00-00-3rjjl.gcp.mongodb.net:27017,cluster0-shard-00-01-3rjjl.gcp.mongodb.net:27017,cluster0-shard-00-02-3rjjl.gcp.mongodb.net:27017 --ssl --username myFlixDBadmin --password Posty321! --authenticationDatabase admin --db myFlixDB --collection movies --type json --file movies.json`

`mongoimport --host Cluster0-shard-0/cluster0-shard-00-00-3rjjl.gcp.mongodb.net:27017,cluster0-shard-00-01-3rjjl.gcp.mongodb.net:27017,cluster0-shard-00-02-3rjjl.gcp.mongodb.net:27017 --ssl --username myFlixDBadmin --password Posty321! --authenticationDatabase admin --db myFlixDB --collection users --type json --file users.json`

- Package.json add later
- for parcel to work with async/await: https://github.com/parcel-bundler/parcel/issues/1762

- Class property proposal, so oyu dont have to write out the contructor: https://hackernoon.com/the-constructor-is-dead-long-live-the-constructor-c10871bea599

- MongoDB atlas: https://cloud.mongodb.com/v2/5b8b61c4c0c6e3634ef54c30#clusters