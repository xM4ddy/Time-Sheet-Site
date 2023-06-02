var Typer = {
  text: "",
  accessCountimer: null,
  index: 0,
  speed: 8,
  file: "",
  accessCount: 0,
  deniedCount: 0,
  init: function () {
      accessCountimer = setInterval(function () {
          Typer.updLstChr();
      }, 500);
      $.get(Typer.file, function (data) {
          Typer.text = data;
          Typer.text = Typer.text.slice(0, Typer.text.length - 1);
      });
  },

  content: function () {
      return $("#console").html();
  },

  write: function (str) {
      $("#console").append(str);
      return false;
  },

  addText: function (key) {
      if (key.keyCode == 18) {
          Typer.accessCount++;

          if (Typer.accessCount >= 3) {
              Typer.makeAccess();
          }
      } else if (key.keyCode == 20) {
          Typer.deniedCount++;

          if (Typer.deniedCount >= 3) {
              Typer.makeDenied();
          }
      } else if (key.keyCode == 27) {
          Typer.hidepop();
      } else if (Typer.text) {
          var cont = Typer.content();
          if (cont.substring(cont.length - 1, cont.length) == "|")
              $("#console").html(
                  $("#console")
                      .html()
                      .substring(0, cont.length - 1)
              );
          if (key.keyCode != 8) {
              Typer.index += Typer.speed;
          } else {
              if (Typer.index > 0) Typer.index -= Typer.speed;
          }
          var text = Typer.text.substring(0, Typer.index);
          var rtn = new RegExp("\n", "g");

          $("#console").html(text.replace(rtn, "<br/>"));
          window.scrollBy(0, 50);
      }

      if (key.preventDefault && key.keyCode != 122) {
          key.preventDefault();
      }

      if (key.keyCode != 122) {
          key.returnValue = false;
      }
  },

  updLstChr: function () {
      var cont = this.content();

      if (cont.substring(cont.length - 1, cont.length) == "|")
          $("#console").html(
              $("#console")
                  .html()
                  .substring(0, cont.length - 1)
          );
      else this.write("|"); // else write it
  },
};

function replaceUrls(text) {
  var http = text.indexOf("http://");
  var space = text.indexOf(".one ", http);

  if (space != -1) {
      var url = text.slice(http, space - 1);
      return text.replace(url, '<a href="' + url + '">' + url + "</a>");
  } else {
      return text;
  }
}

Typer.speed = 3;
Typer.file = "../public/content.txt";
Typer.init();

var timer = setInterval("t();", 10);
function t() {
  Typer.addText({ keyCode: 123748 });

  if (Typer.index > Typer.text.length) {
      clearInterval(timer);
  }
}

function switchTheme() {
    console.log("Theme: " + /[^/]*$/.exec(document.getElementById('theme').href)[0]);

    if (/[^/]*$/.exec(document.getElementById('theme').href) == "dark.css") {
      document.getElementById('theme').href = "./public/light.css";
      document.getElementById('switch').innerHTML = "Switch to Dark Theme";
    } else {
      document.getElementById('theme').href = "./public/dark.css";
      document.getElementById('switch').innerHTML = "Switch to Light Theme";
    }
};
  
