var express = require('express');
var cmacc = require('cmacc-compiler');

var path = require('path');
var bodyParser = require('body-parser');

var router = express.Router();

function api(dir) {
    
    router.use(bodyParser.json())

    router.get("*", function (req, res, next) {
        var file = path.join(dir, req.url)
        try {
            var ast = cmacc.compile("file://" + file);
            var EmptyVars = cmacc.find(ast);
            res.send(EmptyVars);
        } catch (e) {
            next(e);
        }
    });

    router.post("*", function (req, res, next) {
        var file = path.join(dir, req.url)
        try {
            var ast = cmacc.compile("file://" + file);
            var data = cmacc.string(req.body);
            var comb = cmacc.merge(ast, data);
            var doc = cmacc.render(comb);
            res.send(doc);
        } catch (e) {
            next(e);
        }
    });

    return router;
}

module.exports = api;