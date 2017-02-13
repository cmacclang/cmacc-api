var express = require('express');
var cmacc = require('cmacc-compiler');

var router = express.Router();

function api(file) {

    router.get("/api/*", function (req, res, next) {
        try {
            var ast = cmacc.compile("file://" + file);
            var EmptyVars = cmacc.find(ast);
            res.send(EmptyVars);
        } catch (e) {
            next(e);
        }
    });

    router.post("/api/*", function (req, res, next) {
        var file = path.join(__dirname, req.url.replace("/api", "/cmacc"));

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