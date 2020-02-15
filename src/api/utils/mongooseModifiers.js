const push = (image) => ({ $push: image });

const returnCopy = () => ({ upsert: true, new: true });

module.exports = { push, returnCopy };
