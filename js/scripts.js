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

const project = document.getElementById('project');

class ImageGallery {
  currentImage = 1;
  projectName = project.className;
  totalImages = this.getImgNumberFromProject (this.projectName, listOfProjects);
  leftArrow = document.getElementById('left').onclick = () => {
    this.minus();
  };
  rightArrow = document.getElementById('right').onclick = () => {
    this.plus();
  };

  plus = () => {
    if ( this.currentImage < this.totalImages ) {
      this.currentImage++;
    } else {
      this.currentImage = 1;
    }
    this.setImageNumber(this.currentImage);
  }
  
  minus = () => {
    if ( this.currentImage !== 1 ) {
      this.currentImage--;
    } else {
      this.currentImage = this.totalImages;
    }
    this.setImageNumber(this.currentImage);
  }
  
  // leftArrow.onclick = () => {
  //   minus();
  // }
  
  // rightArrow.onclick = () => {
  //   this.plus();
  // }

  getImgNumberFromProject (projectName, listOfProjects) {
    if (listOfProjects[projectName]) {
      return listOfProjects[projectName];
    }
  }
  
  /**
   * @param {number} num - The current image number
   * @return {string} The new image url
   */
  setImageNumber (num) {
    // Get image number
    let regex = /\d+(.jpg)/g;
    return project.setAttribute('src', project.src.replace(regex, `${num}.jpg`));
  }
}

let imageGallery = new ImageGallery();

function swipeImages () {
  const screenWidth = window.screen.width;
  let pageStart = 0;
  let pageEnd = 0;
  console.info(screenWidth);

  const handleStart = (event) => {
    event.preventDefault();
    let touches = event.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      console.log("handleStart - event.touches[i].pageX: ", touches[i].pageX);
      pageStart = touches[i].pageX;
    }
  }
  const handleEnd = (event) => {
    event.preventDefault();
    let touchesEnd = event.changedTouches;
        
    for (let i = 0; i < touchesEnd.length; i++) {
      console.log("handleEnd - event.touchesEnd[i].pageX: ", touchesEnd[i].pageX);
      pageEnd = touchesEnd[i].pageX;
    }
    swipe(pageStart, pageEnd);
  }

  function swipe (startX, endX) {
    if (startX - endX < 0 && Math.abs(startX - endX) > screenWidth / 3) {
      console.log("Plus");
      imageGallery.plus();
    }
    if (startX - endX > 0 && Math.abs(startX - endX) > screenWidth / 3) {
      console.log("Minus");
      imageGallery.minus();
    }
  }

  project.addEventListener("touchstart", handleStart, false);
  project.addEventListener("touchend", handleEnd, false);
}

swipeImages();