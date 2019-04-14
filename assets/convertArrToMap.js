const data = require ('./businessesData.json');
const fs = require("fs");

let res = {};
data.map(busi => {
  res[busi.msId] = busi;
});



fs.writeFile("./businessMap.json", JSON.stringify(res), (err) => {
  if (err) console.log(err);
  console.log("Successfully Written to File.");
});
