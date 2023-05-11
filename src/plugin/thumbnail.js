const fs = require("fs");
const path = require("path");
const url = require("url");

module.exports = async ({ src, dest, item }) => {
    return new Promise(async (resolve, reject) => {
        try {

            item.width = 100;
            item.height = 100;
            resolve(item);
        } catch (err) {
            reject(err);
        }
    });
}
