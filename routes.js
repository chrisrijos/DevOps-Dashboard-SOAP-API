module.exports = function(app){

  //GET Routes
  app.get("/", function(req, res){
    res.sendFile(__dirname + "/public/index.html");
  });

  //POST Routes
  
}
