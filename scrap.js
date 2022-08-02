const request = require('request');
const cheerio = require("cheerio");
const xlsx = require('xlsx');
// const { attr } = require('./cheerio/lib/api/attributes');
// const chalk = require("chalk");
// feature -> request
// console.log("Before");
request('https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/', cb);
// request("https://neetcode.io/",cb);
console.log("After")
function cb(error, response, html) {
    if (error) {
        console.error('error:', error); // Print the error if one occurred
    } else {
        handlehtml(html);
        // Print the HTML for the Google homepage.
    }
}
var data=[];
function handlehtml(html) {
    let $ = cheerio.load(html);
    //let h1s = selTool("h1");
    let linkObjects = $('a');
//    for( let i=0;i<linkObjects.length;i++)
//    {
//     let links  = $(linkObjects(i)).attr("href");
//    
//    }

    var links = [];
    linkObjects.each((index, element) => {
      links.push({
        text: $(element).text(), // get the text
        href: $(element).attr('href'),
        // get the href attribute
      });
    });
     data = links;
     let newWB = xlsx.utils.book_new();
let newWS = xlsx.utils.json_to_sheet(links);
xlsx.utils.book_append_sheet(newWB,newWS,"sheet-1");
xlsx.writeFile(newWB,"striver.xlsx");
    // console.log(allLinks);
}
console.log(data);
//wb--> filepath , ws-->name,json data
