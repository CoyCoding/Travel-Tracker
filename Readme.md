# Travel Tracker Express Server

TODO://
* [x] Basic Setup Server
  * [x] Install Starter Dependencies
  * [x] Install / Setup Linter
  * [x] Setup Express App
  * [x] Setup 404 / Error Middlewares
* [ ] Setup DB Locations
  * [x] Setup Mongoose Model
  * [x] POST / GET Locations
  * [x] Test routes
* [ ] Setup DB Images
  * [x] Setup Mongoose Model
  * [ ] Research Image uploading and cropping
  * [ ] Resize original image for thumbnail
  * [ ] Save Original and thumbnail to database
* [ ] Setup Client
  * [ ] Create Form to add a new entry
  * [ ] Setup Map SDK on client
  * [ ] List all log entries on map

# Mongo DB

## User
- UserName @String
- Locations @[Location]
- Friends @[User]
- PendingFriends @[User]
- FriendRequest @[User]

## Travel Location

- Id @int
- Title @string
- Description @string
- Images @[ImageIds]
- Fun Factor @int (1-5)
- Arrival at Destination Date @Date
- Leaving Destination Date @Date
- Latitude @float
- Longitude @float
- Created At @Date
- Updated At @Date

## Image

- Id @int
- Url @string
