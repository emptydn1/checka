var WebTorrent = require("webtorrent");

var client = new WebTorrent();

var magnetURI =
  "./[Kuronomiki] Takamine-ke no Sanrinsou _Fruits_ _ The Three Flowers of The Takamine House _Fruits_ (Garden) [English] [obsoletezero] [Digital].torrent";

client.add(magnetURI, { path: __dirname }, function (torrent) {
  torrent.on("download", function (bytes) {
    console.log("just downloaded: " + bytes);
    console.log("total downloaded: " + torrent.downloaded);
    console.log("download speed: " + torrent.downloadSpeed);
    console.log("progress: " + torrent.progress);
    console.log((torrent.progress * 100).toFixed());
  });
  torrent.on("done", function () {
    console.log("torrent download finished");
  });
});
