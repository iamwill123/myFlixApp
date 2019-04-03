# myFlixApp
jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGYXZvcml0ZU1vdmllcyI6W10sIl9pZCI6IjVjOTE2N2JjNTQzOWEwNDk2ZTQyODJiYyIsIlVzZXJuYW1lIjoiaWFtd2lsbCIsIlBhc3N3b3JkIjoicG9zdHkxMjMiLCJFbWFpbCI6IndpbGxAaWFtd2lsbC51cyIsIkJpcnRoZGF5IjoiMTk4NS0wNC0wNFQwNTowMDowMC4wMDBaIiwiX192IjowLCJpYXQiOjE1NTMwMzk4NDksImV4cCI6MTU1MzY0NDY0OSwic3ViIjoiaWFtd2lsbCJ9.n2de855jRddIIa5BS4t13ODGU9SzGcDoH9xln1jOuP0"

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
    "parcel": "parcel client/src/index.html",
    "heroku": "git push heroku master"