const express = require("express");
const mainRouter = express.Router();
const fs = require("fs");
const pdf = require("html-pdf");
const conversion = require("phantom-html-to-pdf")();
const phantom = require("phantom");
const Participant = require("../models/Participant");
const pdfshift = require("pdfshift");
const htmlToImage = require("html-to-image");
mainRouter.post("/participant", function(req, res) {
  console.log(req.body);
  let page =
    "<!DOCTYPE html>" +
    "<html>" +
    "	<head>" +
    '<meta charset="utf-8" />' +
    "	<title>This is title</title>" +
    "	<link" +
    '	rel="stylesheet"' +
    '		href="bootstrap-3.4.0-dist/css/bootstrap.min.css"' +
    "/>" +
    "<link" +
    '	href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300"' +
    '	rel="stylesheet"' +
    "	/>" +
    "<style>" +
    "		.container {" +
    "		margin: 1%;" +
    "	}" +
    "		.left-container {" +
    "	display: flex;" +
    "	flex-direction: column;" +
    "	align-items: center;" +
    "	padding: 5% 2%;" +
    "	}" +
    "	.middle-container {" +
    "		display: flex;" +
    "		flex-direction: column;" +
    "	align-items: flex-start;" +
    "	padding: 1%;" +
    "		}" +
    ".right-container {" +
    "		display: flex;" +
    "		flex-direction: column;" +
    "	align-items: flex-end;" +
    "		}" +
    ".line {" +
    "	flex: 1;" +
    "	width: 60%;" +
    "	border: 2px solid black;" +
    "	margin: 6% 20% 2px 20%;" +
    "	}" +
    "	body {" +
    "	background-color: white;" +
    "		}" +
    "h1 {" +
    "		color: black;" +
    "		margin: 0px;" +
    "		text-align: center;" +
    "font-weight: 500;" +
    'font-family: "Montserrat";' +
    "	}" +
    "	h2 {" +
    "		color: black;" +
    "	margin: 0px;" +
    "	}" +
    "		h5 {" +
    "		color: black;" +
    "	margin: 0px;" +
    "	}" +
    "	.para {" +
    "	margin-top: 10px;" +
    "	margin-bottom: 65px;" +
    "	padding-right: 20px;" +
    "	text-align: justify;" +
    "	}" +
    "	.pic {" +
    "	width: 100px;" +
    "	height: auto;" +
    "	}" +
    "	.qr {" +
    "		width: 200px;" +
    "	height: auto;" +
    "	}" +
    "	.bottom-container {" +
    "	border-right: 4px solid black;" +
    "	}" +
    "	.list {" +
    "padding-left: 20px;" +
    "	}" +
    "	</style>" +
    "</head>" +
    '	<body style="background-image:url(background.jpg)">' +
    '	<div class="container">' +
    '		<div class="row">' +
    '		<div class="col-md-6">' +
    '	<div class="left-container">' +
    "	<h1>5th NATIONAL</h1>" +
    "	<h1>ENGLISH CARNIVAL</h1>" +
    '	<div class="line"></div>' +
    '	<h3 style="font-weight: bold;">FEBRUARY 7-9, 2019</h3>' +
    '	<div class="bottom-container">' +
    '	<p class="para">' +
    "	Gates open at 02:00PM on the first day and at 08:00AM on the\n" +
    "	next two days. Please bring this ticket for payment and\n" +
    "	participation. Print or any electronic format is acceptable.\n" +
    "	Show this ticket, complete your payment and get your coupons and\n" +
    "		ID card." +
    "	</p>" +
    '	<img class="pic" src="ndec_logo.png" />' +
    "	</div>" +
    "	</div>" +
    "	</div>" +
    '	<div class="col-md-6" style="display: flex;">' +
    '	<div class="middle-container">' +
    '	<img class="pic" src="e.png" />' +
    "	<h3>Registerd Events:</h3>" +
    '	<ul class="list" style="list-style-type:square">' +
    "	<li>Turn Coat</li>" +
    "<li>Spell Master</li>" +
    "	<li>English Olympiad</li>" +
    "		<li>Word Play</li>" +
    "	<li>Extempore Speech</li>" +
    "		<li>Poem Recitation</li>" +
    "		<li>Composition Submission</li>" +
    "<li>Parody News Reading</li>" +
    "	<li>Instant Story Writing</li>" +
    "	<li>Scrapbook</li>" +
    "		<li>Multimedia Presentation</li>" +
    "			<li>Literature Quiz</li>" +
    "<li>GOT Quiz</li>" +
    "		<li>Wall Magazine</li>" +
    "	<li>Mega Quiz</li>" +
    "		</ul>" +
    "	</div>" +
    '		<div style="flex: 1;"></div>' +
    '	<div class="right-container">' +
    "			<h2>ARKA RAHMAN</h2>" +
    "		<h2>IBA, DU</h2>" +
    "	<h4>UNIVERSITY LEVEL</h4>" +
    "		<h5>(kaskjaks@gmail.com)</h5>" +
    '	<div style="height: 32%;"></div>' +
    '		<img class="qr" src="qr_box.png" />' +
    "</div>" +
    "</div>" +
    "	</div>" +
    "	</div>" +
    "	</body>" +
    "</html>";

  var options = { format: "Letter" };
  fs.writeFile("design.html", page, err => {
    if (err) {
      console.log("error here");
    }
    console.log("The file has been saved!");
    var html = fs.readFileSync("./design.html", "utf8");

    phantom.create().then(function(ph) {
      ph.createPage().then(function(page) {
        page.open("design.html").then(function(status) {
          page.render("google.pdf").then(function() {
            console.log("Page Rendered");
            ph.exit();
          });
        });
      });
    });
  });
  // htmlToImage
  //   .toPng(page)
  //   .then(function(dataUrl) {
  //     var img = new Image();
  //     img.src = dataUrl;
  //     document.body.appendChild(img);
  //   })
  //   .catch(function(error) {
  //     console.error("oops, something went wrong!", error);
  //   });
  // var options = { format: "Letter" };
  // //var options = { format: 'Letter' };

  // fs.writeFile("./design.html", page, err => {
  //   if (err) throw err;
  //   console.log("The file has been saved!");
  //   var html = fs.readFileSync("./design.html", "utf8");
  //   conversion({ html: html }, function(err, pdf) {
  //     var output = fs.createWriteStream("./design.pdf");
  //     console.log(pdf.logs);
  //     console.log(pdf.numberOfPages);
  //     // since pdf.stream is a node.js stream you can use it
  //     // to save the pdf to a file (like in this example) or to
  //     // respond an http request.
  //     pdf.stream.pipe(output);
  //   });
  //   // pdf.create(pageToprint, options).toFile('./public/pdf/design.pdf', function (err, res) {
  //   //     if (err) {
  //   //         console.log(err, "here");
  //   //         //res.status(500).send("Some kind of error...");
  //   //         return;
  //   //     }
  //   //     console.log('pdf created on printMessage');
  //   // });
  // });
  return res.json({ success: true });
  // Participant.insertNewParticipant(req.body, (status, err, data) => {
  //   if (status === 200) {
  //     return res.json({ success: true, participant: data });
  //   } else {
  //     return res.json({ success: false, err: err });
  //   }
  // });
});
mainRouter.post("/event", function(req, res) {
  console.log(req.body);
  //return res.json({ success: true });
  Participant.updateEvents(req.body, (status, err, data) => {
    if (status === 200) {
      let page =
        "<!DOCTYPE html>" +
        "<html>" +
        "	<head>" +
        '<meta charset="utf-8" />' +
        "	<title>This is title</title>" +
        "	<link" +
        '	rel="stylesheet"' +
        '		href="public/bootstrap-3.4.0-dist/css/bootstrap.min.css"' +
        "/>" +
        "<link" +
        '	href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300"' +
        '	rel="stylesheet"' +
        "	/>" +
        "<style>" +
        "		.container {" +
        "		margin: 1%;" +
        "	}" +
        "		.left-container {" +
        "	display: flex;" +
        "	flex-direction: column;" +
        "	align-items: center;" +
        "	padding: 5% 2%;" +
        "	}" +
        "	.middle-container {" +
        "		display: flex;" +
        "		flex-direction: column;" +
        "	align-items: flex-start;" +
        "	padding: 1%;" +
        "		}" +
        ".right-container {" +
        "		display: flex;" +
        "		flex-direction: column;" +
        "	align-items: flex-end;" +
        "		}" +
        ".line {" +
        "	flex: 1;" +
        "	width: 60%;" +
        "	border: 2px solid black;" +
        "	margin: 6% 20% 2px 20%;" +
        "	}" +
        "	body {" +
        "	background-color: white;" +
        "		}" +
        "h1 {" +
        "		color: black;" +
        "		margin: 0px;" +
        "		text-align: center;" +
        "font-weight: 500;" +
        'font-family: "Montserrat";' +
        "	}" +
        "	h2 {" +
        "		color: black;" +
        "	margin: 0px;" +
        "	}" +
        "		h5 {" +
        "		color: black;" +
        "	margin: 0px;" +
        "	}" +
        "	.para {" +
        "	margin-top: 10px;" +
        "	margin-bottom: 65px;" +
        "	padding-right: 20px;" +
        "	text-align: justify;" +
        "	}" +
        "	.pic {" +
        "	width: 100px;" +
        "	height: auto;" +
        "	}" +
        "	.qr {" +
        "		width: 200px;" +
        "	height: auto;" +
        "	}" +
        "	.bottom-container {" +
        "	border-right: 4px solid black;" +
        "	}" +
        "	.list {" +
        "padding-left: 20px;" +
        "	}" +
        "	</style>" +
        "</head>" +
        '	<body style="background-image:url(background.jpg)">' +
        '	<div class="container">' +
        '		<div class="row">' +
        '		<div class="col-md-6">' +
        '	<div class="left-container">' +
        "	<h1>5th NATIONAL</h1>" +
        "	<h1>ENGLISH CARNIVAL</h1>" +
        '	<div class="line"></div>' +
        '	<h3 style="font-weight: bold;">FEBRUARY 7-9, 2019</h3>' +
        '	<div class="bottom-container">' +
        '	<p class="para">' +
        "	Gates open at 02:00PM on the first day and at 08:00AM on the\n" +
        "	next two days. Please bring this ticket for payment and\n" +
        "	participation. Print or any electronic format is acceptable.\n" +
        "	Show this ticket, complete your payment and get your coupons and\n" +
        "		ID card." +
        "	</p>" +
        '	<img class="pic" src="ndec_logo.png" />' +
        "	</div>" +
        "	</div>" +
        "	</div>" +
        '	<div class="col-md-6" style="display: flex;">' +
        '	<div class="middle-container">' +
        '	<img class="pic" src="e.png" />' +
        "	<h3>Registerd Events:</h3>" +
        '	<ul class="list" style="list-style-type:square">';
      data.individualEvent.forEach(event => {
        page = page + "	<li>" + event + "</li>";
      });
      data.teamEvent.forEach(event => {
        page =
          page +
          "	<li>" +
          event.event_name +
          "(" +
          event.team_name +
          ")" +
          "</li>";
      });
      page =
        page +
        "		</ul>" +
        "	</div>" +
        '		<div style="flex: 1;"></div>' +
        '	<div class="right-container">' +
        "			<h2>" +
        data.name +
        "</h2>" +
        "		<h2>" +
        data.institution +
        "</h2>" +
        "	<h4>" +
        data.level +
        " LEVEL</h4>" +
        "		<h5>(" +
        data.email +
        ")</h5>" +
        '	<div style="height: 32%;"></div>' +
        '		<img class="qr" src="qr_box.png" />' +
        "</div>" +
        "</div>" +
        "	</div>" +
        "	</div>" +
        "	</body>" +
        "</html>";
      var options = { format: "Letter" };
      fs.writeFile("adin.html", page, err => {
        if (err) {
          console.log("error here");
        }
        console.log("The file has been saved!");
        var html = fs.readFileSync("./adin.html", "utf8");

        phantom.create().then(function(ph) {
          ph.createPage().then(function(page) {
            page.open("adin.html").then(function(status) {
              page.render("adin.pdf").then(function() {
                console.log("Page Rendered");
                ph.exit();
              });
            });
          });
        });
      });
      return res.json({ success: true, participant: data });
    } else {
      return res.json({ success: false, err: err });
    }
  });
});

mainRouter.post("/participants", function(req, res) {
  console.log(req.body);
  //return res.json({ success: true });
  Participant.getParticipant(req.body.page, (status, err, data) => {
    if (status === 200) {
      return res.json({ success: true, participants: data });
    } else {
      return res.json({ success: false, err: err });
    }
  });
});
module.exports = mainRouter;
