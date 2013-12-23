module.exports = function *(err, ctx) {
  console.error('server error', err, ctx);
  process.disconnect();
}