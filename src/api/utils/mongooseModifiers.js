const push = (obj) => ({ $push: obj });

const returnCopy = { upsert: true, new: true };

module.exports = { push, returnCopy };
