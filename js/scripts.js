/**
 * @desc - All projects with number of detail images for every project
 */
const listOfProjects = {
  rpb: 4,
  icfis: 3,
  dev1: 10,
  dev2: 6,
  inco: 8,
  classroom: 10,
  documents: 6,
  body1: 10,
  body2: 8,
  body11: 6,
  body12: 6,
  process: 5
}

let currentImage = 1;
let project = document.getElementById('project');
let projectName = project.className;
let totalImages = getImgNumberFromProject (projectName, listOfProjects);
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

/**
 * @param {number} num - The current image number
 * @return {string} The new image url
 */
function setImageNumber (num) {
  // Get image number
  let regex = /\d+(.jpg)/g;
  return project.setAttribute('src', project.src.replace(regex, `${num}.jpg`));
}

function plus () {
  if ( currentImage < totalImages ) {
    currentImage++;
  } else {
    currentImage = 1;
  }
  setImageNumber(currentImage);
}

function minus () {
  if ( currentImage !== 1 ) {
    currentImage--;
  } else {
    currentImage = totalImages;
  }
  setImageNumber(currentImage);
}
