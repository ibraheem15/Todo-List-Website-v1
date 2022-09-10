module.exports.getDate = function getDate() {
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  var day = today.toLocaleDateString("en-US", options);

  return day;
};
// module.exports = getDate(); //we can do this stuff as well but we will use function cal in index.js
//because in this way it will call the function automatically and we want to call it when we want to
function getDay() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  /* var today = new Date();
  var options = {
    weekday: "long",
  };
  var day = today.toLocaleDateString("en-US", options);
 */
  return today;
}

module.exports.getDay = getDay;
