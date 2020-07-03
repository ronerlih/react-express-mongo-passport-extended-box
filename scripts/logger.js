// formatting log, mostely to add a bit more color
// alternatively use morgan('dev')
// even better, to combine with winston logs. https://www.npmjs.com/package/winston
const fs = require('fs');
const morgan = require('morgan');


morgan.token('custom', function developmentFormatLine (tokens, req, res) {
   const color = {};

   // get the request method
	var method = req.method
	  ? req.method
     : undefined
     
   // get method color
   color.methodColor = method.trim() === 'GET' 
         ? 36 // cyan
         : method.trim() === 'POST'  
            ? 35 // yellow
            : method.trim() === 'PUT'
               ? 33 // cyan
               : method.trim() === 'DELET' 
                  ? 32 // green
                     : 0 // no color

	// get status color
	// get the status code if response written
	var status = res.headersSent
	  ? res.statusCode
	  : undefined
 
	// get status color
	color.statusColor = status >= 500 ? 31 // red
	  : status >= 400 ? 33 // yellow
		 : status >= 300 ? 36 // cyan
			: status >= 200 ? 32 // green
			  : 0 // no color
 
	  // compile
	  fn = developmentFormatLine[color] = morgan.compile('\x1b[' + color.methodColor + 'm:method \x1b[0m:url \x1b[' +
     color.statusColor + 'm:status\x1b[0m :response-time ms - :res[content-length]\x1b[0m\n')
 
	return fn(tokens, req, res)
 })

 module.exports = morgan('custom', {
      // stream to file (with day prefix)
      // be sure to offload log file to db
      // monitor memory usage
      // set up alerts and pagerDuty

      // stream: fs.createWriteStream('./logs/0' + new Date().getDate() + '_access.log', {flags: 'a'})
});