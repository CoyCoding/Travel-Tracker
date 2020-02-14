### Travel Tracker Express Server

TODO://
* [ ] Setup Server
  * [x] Install Starter Dependencies
  * [x] Install / Setup Linter
  * [x] Setup Express App
  * [x] Setup 404 / Error Middlewares
* [] Setup DB
  * [x] Setup Mongoose Model(s)
  * [ ] POST
* [ ] Create a new location entry
  * [ ] GET
  * [ ] List all log entries
* [ ] Research Image uploading and cropping
  * [ ] Resize original image for thumbnail
  * [ ] Save Original and Crop to database
  * [ ]
* [ ] Setup Client
  * [ ] Create Form to add a new entry
  * [ ] Setup Map SDK on client
  * [ ] List all log entries on map

### Mongo DB

##Travel Locations

- Id @int
- Title @string
- Description @string
- Fun Factor @int (1-5)
- Arrival at Destination Date @Date
- Leaving Destination Date @Date
- Latitude @float
- Longitude @float
- Created At @Date
- Updated At @Date

## Images

- Id @int
- locationId @int [one Location - Many images]
- Url @string
