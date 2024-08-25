let doneUpload = false;
let isDraw = false;
let isDrawing = false;
let canvas;
let cursor;
const CURSOR_SIZE = 2;

let prevX = 0;
let prevY = 0;

async function uploadImageToCanvas(data) {
  const ctx = canvas.getContext('2d');

  const img = new Image();
  img.src = data;

  return new Promise((resolve, reject) => {
    img.onload = () => {
      const imageWidth = img.naturalWidth;
      canvas.width = imageWidth;
      const imageHeight = img.naturalHeight;
      canvas.height = imageHeight;

      resolve(ctx.drawImage(img, 0, 0, imageWidth, imageHeight));
    }
    img.onerror = (error) => {
      console.error(error);
      reject;
    }
  });
}

async function uploadFile(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  const data = await new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      console.error(error);
      reject;
    }
  });

  uploadImageToCanvas(data);
}

function setupCanvasEvent() {
  $('#myCanvas').mouseover(() => {
    if (isDraw) {
      isDrawing = false;

      canvas.style.cursor = 'none';
      cursor.style.visibility = '';
      cursor.style.backgroundColor = 'black';
      cursor.style.border = '2px solid black';
      cursor.style.width = CURSOR_SIZE + 'px';
      cursor.style.height = CURSOR_SIZE + 'px'
    }
  });

  $('#myCanvas').mouseout(() => {
    if (isDraw) {
      canvas.style.cursor = 'default';
      cursor.style.visibility = 'hidden';
    }
  });

  $('#myCanvas').mousedown((event) => {
    if (isDraw) {
      isDrawing = true;
      prevX = event.offsetX;
      prevY = event.offsetY;
    }
  });

  $('#myCanvas').mouseup(() => {
    if (isDraw) {
      isDrawing = false;
    }
  });

  $('#myCanvas').mousemove((event) => {

    if (isDraw) {
      const x = event.clientX;
      const y = event.clientY;
      cursor.style.left = (x - (CURSOR_SIZE / 2)) + 'px';
      cursor.style.top = (y - (CURSOR_SIZE / 2)) + 'px';
    }
    if (isDrawing) {
      const x = event.offsetX;
      const y = event.offsetY;

      const ctx = canvas.getContext('2d');

      ctx.strokeStyle = 'black';
      ctx.lineWidth = CURSOR_SIZE;

      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.stroke();

      prevX = x;
      prevY = y;
    }

  });

}

$(document).ready(() => {
  $('#upload_button').click(() => {
    $('#file').click();

    doneUpload = true;
  })

  $('#file').on('change', (event) => {
    let file = event.target.files[0];
    uploadFile(file);

    $('#file').val(null);
  })

  $('#draw_button').click(() => {
    if (doneUpload) {
      isDraw = !isDraw
    }
  });

  canvas = $('#myCanvas')[0];
  cursor = $('#cursor')[0];

  setupCanvasEvent();

});