var prometheus = require("prometheus-wrapper");
 
var express = require('express');
var app = express();
 
prometheus.setNamespace("myapp");
 
app.get('/prometheus', function(req, res) {
  res.end(prometheus.getMetrics());
});
 
// Counter 
prometheus.createCounter("mycounter", "A number we occasionally increment.");
 
// Gauge 
prometheus.createGauge("mygauge", "A random number we occasionally set.");
 
// Histogram 
prometheus.createHistogram("myhistogram", "A chat duration histogram.", {
    buckets: [ 10, 30, 60, 300, 600, 1800, 3600 ]
});
 
// Summary 
prometheus.createSummary("mysummary", "Compute quantiles and median of a random list of numbers.", {
    percentiles: [ 0.01, 0.1, 0.5, 0.9, 0.99 ]
});
 
app.listen(8081);