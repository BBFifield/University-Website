/**
 * GET Student page 
 */

router.get('/', function (req, res, next) {

res.render('student', {studentName: 'Justin'});

});
