
async function uploadImageToCanvas(data) {
  const canvas = $('#myCanvas')[0];
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
      console.log(error);
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
      console.log(error);
      reject;
    }
  });

  uploadImageToCanvas(data);
}

$(document).ready(() => {
  $('#upload_button').click(() => {
    $('#file').click();

    return false;
  })

  $('#file').on('change', (event) => {
    let file = event.target.files[0];
    uploadFile(file);
  })

});