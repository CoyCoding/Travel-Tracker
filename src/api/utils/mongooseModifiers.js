// Option for mongoose database query for returning a copy of the updated entry
// also will insert the key if no key exists for what you are inserting
const returnCopy = { upsert: true, new: true };

module.exports = { returnCopy };
