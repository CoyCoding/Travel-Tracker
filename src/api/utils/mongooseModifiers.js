const push = (obj) => ({ $push: obj });

const returnCopy = () => ({ upsert: false, new: false });

module.exports = { push, returnCopy };
