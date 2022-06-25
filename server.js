//"/homepage","/".""
//"/productpage" =>product page
//"/api" =>display data.json to browser
// error 404 page not found
var http =require("http");
var fs=require("fs");
var json =fs.readFileSync("./data.json");
var url= require("url");
var template = fs.readFileSync("./product.html");
template = template+"";
json =JSON.parse(json);
function replace (product,template){
    template = template.replace(/{image}/g,product["image"]);
    template = template.replace(/{productName}/g, product["productName"]);
    template = template.replace(/{from}/g, product["from"]);
    template = template.replace(/{nutrients}/g, product["nutrients"]);
    template = template.replace(/{quantity}/g, product["quantity"]);
    template = template.replace(/{price}/g, product["price"]);
    template = template.replace(/ {description}/g, product[" description"]);
    return template;

}
var server = http.createServer(function(req,res){
    var url1= url.parse(req.url,true);
    var pathname =url1.pathname;
  var id = url1.query.id;
    if(pathname=="/homepage"||req.url=="/"|| req.url==""){
        res.write("<h1>home page</h1>");
    }
   else if (req.url == "/api" ) {
        res.write(json);
    }
   else if (pathname == "/product") {
        if(id==0){
            var productpage = replace(json[0],template);
        res.write(productpage);
        }
        else if(id==1){
            var productpage = replace(json[1], template);
            res.write (productpage);
        }
        else if(id == 2){
            var productpage = replace(json[2], template);
            res.write(productpage);
            
        }
        else if(id == 3){
            var productpage = replace(json[3], template);
            res.write(productpage);
        }
        else if(id==4){
            var productpage = replace(json[4], template);
            res.write(productpage);

        }
    }
    else{
        res.write("<h1>page not found</h1>");
    }
    res.end();
})
server.listen(2000, function () {
    console.log("server created")
    
})
