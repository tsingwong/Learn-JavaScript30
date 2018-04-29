const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    window.navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then(localMediaStream => {
        console.log(localMediaStream);
        video.srcObject = localMediaStream;
        // chrome 68 中建议用 element.srcObject 代替下面方法
        // video.src = window.URL.createObjectURL(localMediaStream);
        video.play();
    }).catch(err => {
        console.log('OH, No...' + err);
    });
}

function paintToCanvas() {
    const {videoWidth: width, videoHeight: height} = video;
    console.log(width, height, video);
    canvas.width = width;
    canvas.height = height;

    setInterval(() => {
        ctx.drawImage(video, 0, 0, width,height);
    }, 16);

    

}

getVideo();

