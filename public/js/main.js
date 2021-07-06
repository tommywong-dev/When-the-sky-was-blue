let skyElementSecond;
let skyElementFirst;
let lobbySkyTransition, lobbySkyTransitionTwo, lobbySkyTransitionThree;
let redVal = 76;
let greenVal = 0;
let blueVal = 0;
let scene2El;
let lobbyEl = document.querySelector("#lobby");
let embers;
//state counter 0 = lobby, francis1 = first scene, francis2 = second, etc.
var state = 0;
let floorToFadeScene1;
//scene 3
let planePos = 0;
let scene3El;
let francisTorus1Increment = 0;
let francisTorus2Increment, francisTorus3Increment;
let francis1 = document.querySelector("#francis1");
let scene1El;
let cursorReticle;
let changedFrancis1, changedFrancis2, changedFrancis3;
let emberBrightness = 0;
var scene = document.querySelector("a-scene");
let plane = document.querySelector("#planeToFollow");
let cam = document.querySelector("#lobbyCam");

AFRAME.registerComponent("foo", {
  //initialize js variables to components in aframe with their classes and ids
  init: function () {
    scene.pause();
    changedFrancis1 = document.querySelector("#francisColorOne");
    embers = document.querySelector("#embers");
    francis1 = document.querySelector("#francis1");
    floorToFadeScene1 = document.querySelector("#floorToFadeScene1");
    lobbySkyTransition = document.querySelector("#lobbySky");
    lobbySkyTransitionTwo = document.querySelector("#lobbySkyTransitionTwo");
    lobbySkyTransitionThree = document.querySelector(
      "#lobbySkyTransitionThree"
    );

    lobbySkyTransition.setAttribute("visible", true);
    lobbySkyTransitionTwo.setAttribute("visible", false);
    lobbySkyTransitionThree.setAttribute("visible", false);

    scene1El = document.querySelector("#firstPerformance");
    scene2El = document.querySelector("#secondPerformance");
    scene3El = document.querySelector("#thirdPerformance");

    skyElementSecond = document.querySelector("#scene2Sky");
    skyElementFirst = document.querySelector("#scene1Sky");
    lobbyEl.pause();
    //set other scenes to be invsible (will be made visible on scene enter)
    scene1El.setAttribute("visible", "false");
    scene2El.setAttribute("visible", "false");
    scene3El.setAttribute("visible", "false");
  },
  tick: function (time) {
    if (state == 0) {
      //transition  to other scene is triggered once light attached to each francis reaches a certain value.
      //Initial light transitions are not triggered in this script, they are native to a-frame with the cursor object triggering the light when the hover is long enough.
      //light not too intense, trigger animation with a full screen HTML element and fade it in.
      //need to see which francis' light triggered this, in this case checking if it is #francis1
      document.getElementById("performance_1_audio").pause();
      document.getElementById("performance_2_audio").pause();
      document.getElementById("performance_3_audio").pause();
      document.getElementById("player").play();
      if (
        document.querySelector("#francis1").components.light.light.intensity >
        0.1
      ) {
        // lobbySkyTransition.setAttribute("visible", "true");
        // lobbySkyTransition.setAttribute("animation", "autoplay", true);
        $("#panelToFadeBetweenScenes").fadeIn(1900);
        setTimeout(function () {
          $("#panelToFadeBetweenScenes").fadeOut(1900);
        }, 2000);
        //when light really really gets intense then we actually change the scene
        if (
          document.querySelector("#francis1").components.light.light.intensity >
          7.5
        ) {
          state = -1;
          cam.setAttribute("position", { x: 0, y: 0, z: 0 });
          console.log('%c first performance', 'background-color: green')
          lobbyEl.setAttribute("visible", "false");
          scene1El.setAttribute("visible", "true");

          //add shape rain to scene 1
          scene1El.setAttribute("shaperain", "");
          floorToFadeScene1.setAttribute("animation", "autoplay", true);
          skyElementFirst.setAttribute("animation", "autoplay", true);

          // trigger audio
          var myAudio = document.getElementById("performance_1_audio");
          var addAudio = document.getElementById("addition_1_audio");
          myAudio.play();
          addAudio.play();
          myAudio.volume = 0.6;

          document.getElementById("player").pause();
          if (skyElementSecond.components.material.material.color.r <= 0.3) {
            skyElementSecond.setAttribute(
              "material",
              "color",
              `rgb(${redVal}, ${greenVal}, ${blueVal})`
            );
            if (redVal >= 1) {
              redVal -= 1;
            }
          }

          //first text container
          setTimeout(function () {
            $("#breatheIn").fadeIn(2000);
          }, 1000);
          setTimeout(function () {
            $("#breatheIn").fadeOut(1000);
          }, 3000);
          setTimeout(function () {
            $("#breatheOut").fadeIn(6000);
          }, 4000);
          setTimeout(function () {
            $("#breatheOut").fadeOut(1000);
          }, 10000);
          setTimeout(function () {
            $("#panelToFadeBetweenScenes").fadeIn(1900);          
          }, 11000)
          setTimeout(function () {
            $("#panelToFadeBetweenScenes").fadeOut(1900);
            myAudio.pause();
            addAudio.pause();
            lobbyEl.setAttribute("visible", "true");
            scene1El.setAttribute("visible", "false");
          }, 12000);
          setTimeout(function () {
            state = 0;
            floorToFadeScene1.setAttribute("animation", "autoplay", false);
            skyElementFirst.setAttribute("animation", "autoplay", false);
          }, 14000)
          //moving boxes can be triggered here
        }
      }
      // did francis2's light change
      if (
        document.querySelector("#francis2").components.light.light.intensity >
        0.1
      ) {
        $("#panelToFadeBetweenScenes").fadeIn(1900);
        setTimeout(function () {
          $("#panelToFadeBetweenScenes").fadeOut(1900);
        }, 2000);
        if (
          document.querySelector("#francis2").components.light.light.intensity >
          7.5
        ) {
          state = -1;

          lobbyEl.setAttribute("visible", "false");
          scene2El.setAttribute("visible", "true");

          document.getElementById("player").pause();
          var myAudio = document.getElementById("performance_2_audio");
          var addAudio = document.getElementById("addition_2_audio");
          myAudio.play();
          addAudio.play();
          cam.setAttribute("position", {
            x: 0,
            y: 0,
            z: 0
          });

          skyElementSecond.setAttribute("animation", "autoplay", true);

          setTimeout(function () {
            $("#breatheIn").fadeIn(2000);
          }, 1000);
          setTimeout(function () {
            $("#breatheIn").fadeOut(1000);
          }, 3000);
          setTimeout(function () {
            $("#breatheOut").fadeIn(6000);
          }, 4000);
          setTimeout(function () {
            $("#breatheOut").fadeOut(1000);
          }, 10000);
          setTimeout(function () {
            $("#panelToFadeBetweenScenes").fadeIn(1900);          
          }, 11000)
          setTimeout(function () {
            $("#panelToFadeBetweenScenes").fadeOut(1900);
            myAudio.pause();
            addAudio.pause();
            lobbyEl.setAttribute("visible", "true");
            scene2El.setAttribute("visible", "false");
          }, 12000);
          setTimeout(function () {
            state = 0;
            skyElementSecond.setAttribute("animation", "autoplay", false);
          }, 14000)
        }
      }

      if (
        document.querySelector("#francis3").components.light.light.intensity >
        0.1
      ) {
        $("#panelToFadeBetweenScenes").fadeIn(1900);
        setTimeout(function () {
          $("#panelToFadeBetweenScenes").fadeOut(1900);                
        }, 2000);
        if (
          document.querySelector("#francis3").components.light.light.intensity >
          7.5
        ) {
          state = -1;
          cam.setAttribute("position", { x: 0, y: 0, z: 0 });
          lobbyEl.setAttribute("visible", "false");
          scene3El.setAttribute("visible", "true");

          document.getElementById("player").pause();
          let myAudio = document.getElementById("performance_3_audio");
          var addAudio = document.getElementById("addition_3_audio");
          myAudio.play();
          addAudio.play();
          setTimeout(function () {
            $("#breatheIn").fadeIn(2000);
          }, 1000);
          setTimeout(function () {
            $("#breatheIn").fadeOut(1000);
          }, 3000);
          setTimeout(function () {
            $("#breatheOut").fadeIn(6000);
          }, 4000);
          setTimeout(function () {
            $("#breatheOut").fadeOut(1000);
          }, 10000);
          setTimeout(function () {
            $("#panelToFadeBetweenScenes").fadeIn(1900);          
          }, 11000)
          setTimeout(function () {
            $("#panelToFadeBetweenScenes").fadeOut(1900);
            myAudio.pause();
            addAudio.pause();
            state = 0;
            lobbyEl.setAttribute("visible", "true");
            scene3El.setAttribute("visible", "false");
          }, 12000);
          setTimeout(function () {
          }, 14000)
        }
      }
    }
  }
});

//######################################################################
// Shadow code below, server-side

/*Socket IO side */
var socket = io();

var shadowNum = 0;

socket.emit("userConnected");
socket.on("userCount", data => {
  console.log('client count:', data);
  if (!shadowNum) {
    for (let i = 0; i < data; i++) appendShadow(i);
  } else {
    appendShadow(data);
  }
})

function appendShadow(id) {
  shadowNum = id;
  // https://stackoverflow.com/questions/41336889/adding-new-entities-on-the-fly-in-aframe
  let x = getRandomArbitrary(-20, 20);
  let y = 1;
  let z = getRandomArbitrary(-30, -20);
  // imporve shadow randomization below
  const position = `${x} ${y} ${z}`;

  $("<a-plane/>", {
    id: `shadow${id}`,
    // class: "shadowsss",
    position: position, // doesn't seem to do anything, known issue
    scale: "10 10 10",
    rotation: "0 0 0",
    material: "src: #shadow; transparent: true",
    appendTo: $("#lobby")
  });
  document.getElementById(`shadow${id}`).setAttribute("position", position); // this does set position as a workaround
}

function removeObject(objectCount) {
  let id = objectCount - 1;
  if (id < 0) {
    id = 0;
  }
  previousObject = document.getElementById(`shadow${id}`);
  previousObject.parentNode.removeChild(previousObject);
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
//######################################################################

AFRAME.registerComponent("lobby-cam", {
  init: function () {
    document.body.addEventListener('mousemove', (e) => {
      this.el.object3D.rotation.y = - (e.clientX / 180);
    })
  }
});

//######################################################################
// Shape rain component below (scene 1 cubes)
var roundtripcounter = 0;
var shapes = [];
var shapepositions = {};

AFRAME.registerComponent("shaperain", {
  init: function () {
    this.shapesreference = [];
    let objects_per_shape = 10;
    // this.shapes = [];
    let size = 0.4,
      spacing = 1,
      x;
    let sceneEl = document.querySelector("#firstPerformance");

    const number_of_objects = 40
    const shape_options = ['box', 'sphere', 'dodecahedron', 'tetrahedron'];
    for (let i = 0; i < number_of_objects; i++) {
      const shape = shape_options[Math.floor(Math.random() * 4)]
      shapes[i] = document.createElement("a-entity");
      // create components, id, geometry, position
      shapes[i].setAttribute("id", `${shape}_` + i.toString());
      if (shape === 'box') {
        shapes[i].setAttribute("geometry", {
          primitive: shape,
          height: size,
          width: size,
          depth: size
        });
      } else {
        shapes[i].setAttribute("geometry", {
          primitive: shape,
          radius: size,
        });
      }
      x = ((size + spacing) * objects_per_shape * -0.5 + i * (size + spacing)) * Math.random(0.8, 1.2);
      // x = (size + spacing) * objects_per_shape * -0.5 + i * (size + spacing);
      y = getRandomArbitrary(3, 7);
      z = getRandomArbitrary(-10, 10);
      const position = `${x} ${y} ${z}`;
      const position_dictionary = { x, y, z, z_initial: z };
      // console.log("intended pos of shape", position);
      shapes[i].setAttribute("position", position);
      shapepositions[`${shape}_` + i.toString()] = position_dictionary;

      // you can add event listeners here for interaction, such as mouse events.
      sceneEl.appendChild(shapes[i]); // Append the element to the scene, so it becomes part of the DOM.

      // set position of the shape once its in the DOM as a workaround
      const shape_from_DOM = document.getElementById(`${shape}_` + i.toString());
      // console.log("Shape from DOM old pos: \n", shape_from_DOM);
      shape_from_DOM.setAttribute("position", position);
      // console.log("Shape from DOM new pos: \n", shape_from_DOM);
    }
  },
  tick: function () {
    shapes.forEach(function (shape) {
      // if (roundtripcounter > 30){
      //   window.location.href = '/lobby';
      // }
      let shapePos = shape.getAttribute("position");
      let shape_id = shape.getAttribute("id");
      if (roundtripcounter === 0) {
        console.log(shapes);
        console.log("Shape pos in tick function");
        console.log(shapePos);
        console.log(shape.getAttribute("id"));
        console.log(shapepositions);
      }
      roundtripcounter += 1;
      xPos = shapepositions[shape_id]["x"];
      yPos = shapepositions[shape_id]["y"];
      zPos = shapepositions[shape_id]["z"] += 0.01;

      if (zPos > 9) {
        shapepositions[shape_id]["z"] = shapepositions[shape_id]["z_initial"];
        shape.setAttribute("color", getRandomColor());
        zPos = shapepositions[shape_id]["z"] = -10;
      }

      shape.setAttribute(
        "position",
        xPos.toString() + " " + yPos.toString() + " " + zPos.toString()
      );
    });

    // this.rockyTerrain.setAttribute("position", { x: 0, y: -23, z: 0 });
  }
});

//https://stackoverflow.com/questions/1484506/random-color-generator
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//######################################################################