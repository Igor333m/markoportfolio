

const listOfProjects = {
  rpb: 4
}

let currentImage = 1;
let project = document.getElementById('project');
let projectName = project.className;
let totalImages = getImgNumberFromProject (projectName, listOfProjects);
let regex = /(img\/)\w+/g;
let image = project.src.match(regex);
let leftArrow = document.getElementById('left');
let rightArrow = document.getElementById('right');

leftArrow.onclick = () => {
  minus();
}

rightArrow.onclick = () => {
  plus();
}

function getImgNumberFromProject (projectName, listOfProjects) {
  if (listOfProjects[projectName]) {
    return listOfProjects[projectName];
  }
}



console.log("leftArrow: ", leftArrow);
console.log("project.src: ", project.src);
console.log("projectName: ", projectName);


console.log("image[0]: ", image[0]);


console.log("image[0].slice(0, -1): ", image[0].slice(0, -1));

function setImageNumber (num) {
  console.log(setImageNumber);
  return project.setAttribute('src', `${image[0].slice(0, -1) + num}.jpg`);
}


function plus () {
  if ( currentImage < totalImages ) {
    currentImage++;
  } else {
    currentImage = 1;
  }
  setImageNumber(currentImage);

  console.log("Plus / currentImage: ", currentImage);
}

function minus () {
  if ( currentImage !== 1 ) {
    currentImage--;
  } else {
    currentImage = totalImages;
  }
  setImageNumber(currentImage);

  console.log("Minus / currentImage: ", currentImage);
}
