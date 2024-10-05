/*
  US 410 incidents, 410 deaths, no gun control
  UK 1 incident, 0 deaths, gun control
  Canada 2 incidents, 2 deaths, gun control
  Germany 3 incidents, 7 deaths, gun control 
  Frace 4 incidents, 7 deaths, gun control
  Russia 5 incidents, 158 deaths, gun control but strong black market
  total incidents 425, total deaths 584
  */

let uk_show = true;
let canada_show = false;
let germany_show = false;
let france_show = false;
let russia_show = false;
let us_show = false;

//Animation booleans
let russiaAnimDone = false;

let click_count = 0;
let percent_Us_incidents = (410 / 425) * 100;
let percent_UK_incidents = (1 / 425) * 100;
let percent_Canada_incidents = (2 / 425) * 100;
let percent_Germany_incidents = (3 / 425) * 100;
let percent_France_incidents = (4 / 425) * 100;
let percent_Russia_incidents = (5 / 425) * 100;

let percent_Us_deaths = (410 / 584) * 100;
let percent_UK_deaths = (0 / 584) * 100;
let percent_Canada_deaths = (2 / 584) * 100;
let percent_Germany_deaths = (7 / 584) * 100;
let percent_France_deaths = (7 / 584) * 100;
let percent_Russia_deaths = (158 / 584) * 100;

let uk_width = 20;
let uk_height = 20;
let canada_width = uk_width * 2;
let canada_height = uk_height * 2;
let germany_width = canada_width * 1.5;
let germany_height = canada_height * 1.5;
let france_width = germany_width * 1.3;
let france_height = germany_height * 1.3;
let russia_width = france_width * 1.7;
let russia_height = france_height * 1.7;
let us_width = russia_width * 82;
let us_height = russia_height * 82;

let time;
let country_array = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  uk = new Country(
    0,
    width / 2,
    height / 2,
    uk_width,
    uk_height,
    "#E72B2B",
    0,
    0
  );
  country_array.push(uk);
  canada = new Country(
    2,
    width / 2,
    height / 2,
    canada_width,
    canada_height,
    "#CD2121",
    uk.width,
    0
  );
  country_array.push(canada);
  germany = new Country(
    7,
    width / 2,
    height / 2,
    germany_width,
    germany_height,
    "#B41818",
    uk.width + canada.width,
    0
  );
  country_array.push(germany);
  france = new Country(
    7,
    width / 2,
    height / 2,
    france_width,
    france_height,
    "#B41818",
    uk.width + canada.width + germany.width,
    0
  );
  country_array.push(france);
  russia = new Country(
    158,
    width / 2,
    height / 2,
    russia_width,
    russia_height,
    "#9A0E0E",
    uk.width + canada.width + germany.width + france.width,
    0
  );
  country_array.push(russia);
  us = new Country(
    410,
    width / 2,
    height / 2,
    us_width,
    us_height,
    "#800404",
    uk.width + canada.width + germany.width + france.width + russia.width,
    0
  );
  country_array.push(us);
  time = millis();
  +100;
}

function draw() {
  background(0);

  if (uk_show) {
    uk.display();
    uk.animate_country_moving();
  }
  if (canada_show) {
    canada.display();
    canada.animate_country_moving();
  }
  if (germany_show) {
    germany.display();
    germany.animate_country_moving();
  }
  if (france_show) {
    france.display();
    france.animate_country_moving();
  }
  if (russia_show) {
    russia.display();
    russia.animate_country_moving();
    if(russia.animDone){
    russia.dropBodies(10);
    }
  }
  if (us_show) {
    us.display();
    us.animate_country_moving();
  }
}

function mousePressed() {
  click_count++;
  if (click_count == 1) {
    uk_show = true;
  } else if (click_count == 2) {
    canada_show = true;
  } else if (click_count == 3) {
    germany_show = true;
  } else if (click_count == 4) {
    france_show = true;
  } else if (click_count == 5) {
    russia_show = true;
  } else if (click_count == 6) {
    us_show = true;
  }
  // if (uk_show) {
  //   uk.animate_country_moving();
  // }
  // if (canada_show) {
  //   canada.animate_country_moving();
  // }
  // if (germany_show) {
  //   germany.animate_country_moving();
  // }
  // if (france_show) {
  //   france.animate_country_moving();
  // }
  // if (russia_show) {
  //  russia.animate_country_moving();
  // }
}

class Country {
  constructor(
    num_deaths,
    x_pos,
    y_pos,
    width,
    height,
    color,
    target_x,
    target_y
  ) {
    this.num_deaths = num_deaths;
    this.x_pos = x_pos;
    this.y_pos = y_pos;
    this.width = width;
    this.height = height;
    this.color = color;
    this.target_x = target_x;
    this.target_y = target_y;
    this.current_square_index = 0;
    this.interval = 500; // Time interval in milliseconds
    this.last_time = 0;

    //For bodies to drop
    this.animDone = false;
    this.bodySize = height*0.1;

    this.minSpeed = height*0.001;
    this.maxSpeed = height*0.01;
    this.bodySpeed = random(this.minSpeed, this.maxSpeed);


    // Initialize an array to store the positions of the ellipses
    this.bodyPositions = [];
    this.initializeBodyPositions();
  }

  initializeBodyPositions() {
    let minX = this.target_x + this.bodySize;
    let maxX = this.target_x + this.width - this.bodySize;

    for (let i = 0; i <= this.num_deaths; i++) {

    
      let bodyX = random(minX, maxX); 
      let bodyY = 0;
      let bodySpeed = random(height*0.001, height*0.01);
      this.bodyPositions.push({ x: bodyX, y: bodyY, speed: bodySpeed });
    }
  }

  display() {
    fill(this.color);
    rect(this.x_pos, this.y_pos, this.width, this.height);
  }

  dropBodies(numBodies) {
    for (let i = 0; i < numBodies && i < this.bodyPositions.length; i++) {
      fill(255);
      ellipse(
        this.bodyPositions[i].x,
        this.bodyPositions[i].y,
        this.bodySize,
        this.bodySize
      );

      //make bodies fall
      this.bodyPositions[i].y += this.bodyPositions[i].speed;

      if(this.bodyPositions[i].y > this.height - this.bodySize/2){
        this.bodyPositions[i].speed = 0;
      }

    }
  }

  // animate_death_count() {
  //   let current_time = millis();
  //   if (current_time - this.last_time > this.interval && this.current_square_index < this.num_deaths) {
  //     let cols = Math.floor(this.width / 10); // Number of columns in the grid
  //     let x_offset = (this.current_square_index % cols) * 10;
  //     let y_offset = Math.floor(this.current_square_index / cols) * 10;

  //     rectMode(CORNER);
  //     fill(255);
  //     rect(this.x_pos + x_offset, this.y_pos + y_offset, 10, 10);

  //     this.current_square_index++;
  //     this.last_time = current_time;
  //   }
  // }

  animate_country_moving() {

    let speed = 2;
    if (this.x_pos != this.target_x || this.y_pos != this.target_y) {
      let dx = this.target_x - this.x_pos;
      let dy = this.target_y - this.y_pos;
      let angle = atan2(dy, dx);
      this.x_pos += cos(angle) * speed;
      this.y_pos += sin(angle) * speed;

      if (abs(dx) < speed) this.x_pos = this.target_x;
      if (abs(dy) < speed) this.y_pos = this.target_y;
    }
    if(this.x_pos == this.target_x && this.y_pos == this.target_y){
      this.animDone = true; 
    }

  }
}

// class Body {
//   constructor(x_pos, y_pos, num_bodies){
//     this.x_pos = x_pos;
//     this.y_pos = y_pos;
//     this.color = color;
//     this.size = height * 0.1;
//     this.speed = 1;
//   }

//   animatte_bodied(){
//     fill(this.color);
//     rect(this.x_pos, this.y_pos, 10, 10);
//   }
// }
