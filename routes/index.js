var express = require('express');
var router = express.Router();
const { ThermalPrinter, PrinterTypes } = require('node-thermal-printer');

const printer = new ThermalPrinter({
  type: PrinterTypes.EPSON,
  interface: 'printer:EPSON TM-T88VI Receipt',
  driver: require('printer'),
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST/all sms webhook. */
router.all('/sms', function(req, res, next) {
  const message = req.body.results[0].text;
  console.log('message', message);

  printer.println(message);
  printer.println('');
  printer.println('#BCLH24');
  printer.cut();
  printer.execute();
  printer.clear();

  res.status(200);
  res.send('all good');
});

module.exports = router;
