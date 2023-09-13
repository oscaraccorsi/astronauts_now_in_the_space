let baseURLBack = 'https://oscaraccorsi.github.io/backgrounds/';
let backgroundList = ['01.png', '02.png', 
                      '03.png', '04.png',
                      '05.png', '06.png', 
                      '07.png', '08.png', 
                      '09.png', '10.png', 
                      '11.png', '12.png',
                      '13.png', '14.png',
                      '15.png', '16.png',
                      '17.png', '18.png',
                      '19.png', '20.png',
                      '21.png', '22.png',
                      '23.png', '24.png'];

baseUrlPictures = ' https://oscaraccorsi.github.io/LoFi/';
let pictureList = ['processor01.png', 
                   'processor02.png', 
                   'processor03.png', 
                   'processor04.png', 
                   'processor05.png',  
                   'processor06.png', 
                   'processor07.png',
                   'processor08.png',
                   'processor09.png', 
                   'processor10.png',
                   'processor11.png',
                   'processor12.png', 
                   'processor13.png',
                   'processor14.png',
                   'processor15.png',
                   'processor16.png',
                   'processor17.png',
                   'processor18.png',
                   'processor19.png',
                   'processor20.png',
                   'processor21.png',
                   'processor22.png',
                   'processor23.png',
                   'processor24.png',
                   'processor25.png',
                   'processor26.png'];

let palette = [];
let img, back;
let col;
let bgColor;
let fusi = [];
let xBack, yBack, widthBack, heightBack, widthTimeBack, heightTimeBack;

let urlData = "http://api.open-notify.org/astros.json";
let astronauts;
let dimension = [];
let velArray = [-1, -0.5,-0.25, -0.125, 0.125, -0.05, 0.05,  0.25, 0.5, 1];
let dimArray = [-1, -0.5,-0.25, 0.25, 0.5, 1];
let timeBackArray = [1, -1, 0.5, -0.5];

//--------------------------------------preload
function preload() {
  let periodImg = minute() %12;
  img = loadImage(baseUrlPictures + pictureList[periodImg]);
  back = loadImage(baseURLBack + random(backgroundList));
}
//--------------------------------------------------windowResized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  xBack = windowWidth/2;
  yBack = windowHeight/2;
  widthBack = windowWidth;
  heightBack= windowHeight;
  widthTimeBack = random(timeBackArray);
  heightTimeBack = random(timeBackArray);

  dimension = [height/1.2, height/1.3, height/1.5, height/1.8, height/2.3, height/4.1];
  ellipseMode(CENTER);
  setInterval(reloadPage, 1000*60);

  back.resize(40, 0);
  //------------------------------------------------palette
  img.resize(50, 0);
  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];
    let alpha = round(random(100, 200));
    let c = [r, g, b, alpha];
    palette.push(c);
  } 
//--------------------------------------------------------
  bgColor = random(palette);

  loadJSON(urlData, gotData, 'jsonp');
   
}

function draw() {

  backBack();
  for(f of fusi) {
    f.display();
    //f.move();
    f.scale(); 
  } 
}

function backBack() {
  imageMode(CENTER);
  image(back, xBack, yBack, widthBack, heightBack);

  widthBack += widthTimeBack;
  heightBack += heightTimeBack;

  if(widthBack > width+width/10 || widthBack < width-width/10) {
      widthTimeBack = widthTimeBack * -1;
    }
    
  if(heightBack > height+height/10 || heightBack < height-height/10) {
    heightTimeBack = heightTimeBack * -1;
  }
} 

function gotData(data) {
  console.log(data);
  astronauts = data;

  for(var i = 0; i < astronauts.number; i++) {
    fusi[i] = {
      x: round(random(width/6, width-width/6)),
      y: height/2,
      larg: width/20,
      lung: round(random(dimension)),
      col: random(palette),
      vel: random(velArray),
      dim: random(dimArray),

      move: function() {
        this.x += this.vel;
          if(this.x > width-this.larg*2 || this.x < this.larg*2) {
            this.vel = this.vel * -1;
          }
        },

      display: function() {
        noStroke();
        fill(this.col);
        ellipse(this.x, this.y, this.larg, this.lung); 
      },

      scale: function() {
        this.larg += this.dim;
          if(this.larg > width/5 || this.larg < width/40) {
            this.dim = this.dim * -1;
          }
      }

    }
    console.log(fusi[i]);  
  }   
}

function reloadPage() {
  window.location.reload();
}

function mousePressed() {
  save();
  
}