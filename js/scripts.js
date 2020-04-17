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

const screenWidth = window.screen.width;
const project = document.getElementById('project');
const visible = document.getElementById('visible');
const modal = document.getElementById('modal');

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

  /**
   * @desc - Shows the image modal
   */
  img = () => {
    // Prevent onclick image modal for smaller screens
    if (screenWidth > 650 ) {
      project.onclick = () => {
        modal.hidden = false;
      };
    }
  }

    /**
   * @desc - Hides the image modal
   */
  modal = () => {
    // Prevent onclick image modal for smaller screens
    if (screenWidth > 650 ) {
      modal.onclick = () => {
        modal.hidden = true;
      }
    }
  }

  plus = () => {
    this.addVisibleClass();
    setTimeout(() => {
      if ( this.currentImage < this.totalImages ) {
        this.currentImage++;
      } else {
        this.currentImage = 1;
      }
      this.setImageNumber(this.currentImage);
      project.addEventListener('load', setTimeout(() => {this.removeVisibleClass()}, 100));
    }, 100);
  }
  
  minus = () => {
    this.addVisibleClass();
    setTimeout(() => {
      if ( this.currentImage !== 1 ) {
        this.currentImage--;
      } else {
        this.currentImage = this.totalImages;
      }
      this.setImageNumber(this.currentImage);
      project.addEventListener('load', setTimeout(() => {this.removeVisibleClass()}, 100));
    }, 100);
  }

  addVisibleClass = () => {
    console.log("addVisibleClass: 2sec");
    visible.setAttribute('class', 'visible');
  }

  removeVisibleClass = () => {
    console.log("removeVisibleClass: 2sec");
    visible.removeAttribute('class', 'visible');
  }

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
    project.setAttribute('src', project.src.replace(regex, `${num}.jpg`));
    modalImage.setAttribute('src', project.src.replace(regex, `${num}.jpg`));
  }
}

let imageGallery = new ImageGallery();
imageGallery.modal();
imageGallery.img();

function swipeImages () {
  let pageStart = 0;
  let pageEnd = 0;
  console.info(screenWidth);

  const handleStart = (event) => {
    let touches = event.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      pageStart = touches[i].pageX;
    }
  }
  const handleEnd = (event) => {
    let touchesEnd = event.changedTouches;
        
    for (let i = 0; i < touchesEnd.length; i++) {
      pageEnd = touchesEnd[i].pageX;
    }
    swipe(pageStart, pageEnd);
  }

  function swipe (startX, endX) {
    if (startX - endX < 0 && Math.abs(startX - endX) > screenWidth / 8) {
      console.log("Plus");
      imageGallery.plus();
    }
    if (startX - endX > 0 && Math.abs(startX - endX) > screenWidth / 8) {
      console.log("Minus");
      imageGallery.minus();
    }
  }

  project.addEventListener("touchstart", handleStart, false);
  project.addEventListener("touchend", handleEnd, false);
}

swipeImages();