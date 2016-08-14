function promiseTry (fn) {
  try {
    return Promise.resolve(fn());
  } catch (error) {
    return Promise.reject(error);
  }
}

function fromCallback (fn) {
  return new Promise((resolve, reject) => {
    fn((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

function delay (time, value) {
  return new Promise(resolve => setTimeout(() => resolve(value), time));
}

module.exports = {
  fromCallback: fromCallback,
  delay: delay,
  try: promiseTry
};
