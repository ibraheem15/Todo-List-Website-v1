module.exports.getDate = function getDate() {
    var today = new Date();
    var options = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };
    var day = today.toLocaleDateString("en-US", options);
  
    return day;
  }
// module.exports = getDate(); //we can do this stuff as well but we will use function cal in index.js
//because in this way it will call the function automatically and we want to call it when we want to
function getDay() {
  var today = new Date();
  var options = {
    weekday: "long",
  };
  var day = today.toLocaleDateString("en-US", options);

  return day;
}

module.exports.getDay = getDay;
