
/*
 * GET home page.
 */

var os = require('os');

exports.index = function(req, res){
  res.render('index', { title: "Skippin Counter Server",
                        ip: getLocalAddress()});
};

exports.client = function(req, res){
  res.render('client', { title: "client",
                        ip: getLocalAddress()});
};

function getLocalAddress() {
    var ifacesObj = {}
    ifacesObj.ipv4 = [];
    ifacesObj.ipv6 = [];
    var interfaces = os.networkInterfaces();

    for (var dev in interfaces) {
        interfaces[dev].forEach(function(details){
            if (!details.internal){
                switch(details.family){
                    case "IPv4":
                        ifacesObj.ipv4.push({name:dev, address:details.address});
                    break;
                    case "IPv6":
                        ifacesObj.ipv6.push({name:dev, address:details.address})
                    break;
                }
            }
        });
    }

    var IPv4 = ifacesObj["ipv4"][0]["address"];
    return IPv4;
};

