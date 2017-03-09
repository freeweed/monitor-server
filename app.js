var Monitor = require('monitor');
var request = require('request')
var LOW_MEMORY_THRESHOLD = 100000000;
var token = 'pQSbcDpGsAmlXt2tepT9s4GTJaRUteV3ot85YdoESqI';

// Set the probe to push changes every 10 seconds
var options = {
  probeClass: 'Process',
  initParams: {
    pollInterval: 10000
  }
}
var processMonitor = new Monitor(options);

// Attach the change listener
processMonitor.on('change', function() {
  var freemem = processMonitor.get('freemem');
  var msg = "Your Free memory Left "+freemem;
  console.log('freemem==>'+JSON.stringify(processMonitor.get('cpus')));
  // request({
  //   method: 'POST',
  //   uri: 'https://notify-api.line.me/api/notify',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   'auth': {
  //     'bearer': token
  //   },form: {
  //     message: msg,
  //     imageThumbnail: 'https://www.w3schools.com/css/img_fjords.jpg',
  //     imageFullsize: 'https://www.w3schools.com/css/img_fjords.jpg'
  //   }
  // }, function(err,httpResponse,body){
  //   console.log(JSON.stringify(err));
  //   console.log(JSON.stringify(httpResponse));
  //   console.log(JSON.stringify(body));
  // })
  // if (freemem < LOW_MEMORY_THRESHOLD) {
  //   console.log('Low memory warning: ' + freemem);
  // }
});

// Now connect the monitor
processMonitor.connect(function(error) {
  if (error) {
    console.error('Error connecting with the process probe: ', error);
    process.exit(1);
  }
});
