var Changeset = require('./lib/Changeset')
var diff_match_patch = require('diff_match_patch').diff_match_patch

var dmp = new diff_match_patch();

var text1 = "Hello adventurer!",
    text2 = "Hello treasured adventurer!",//suppose user A changes text1 to text2 
    text3 = "Good day adventurers, y'all!";//suppose user B changes text1 to text3

var cs1_2 = Changeset.fromDiff(dmp.diff_main(text1, text2));
console.log(cs1_2)

var cs1_3 = Changeset.fromDiff(dmp.diff_main(text1, text3));
console.log(cs1_3)
var cs1_3_t_1_2 = cs1_3.transformAgainst(cs1_2)
var textFinal_2 = cs1_3_t_1_2.apply(text2);

console.log(cs1_3_t_1_2)
console.log(textFinal_2)
process.assert(textFinal_2 === 'Good day treasured adventurers, y\'all!')
