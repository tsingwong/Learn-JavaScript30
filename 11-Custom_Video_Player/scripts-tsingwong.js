/* 获取 DOM 节点 */

const player = document.querySelector('.player');

const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');

const progress__filled = progress.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');

const ranges = player.querySelectorAll('.player__slider');

const skipBtns = player.querySelectorAll('[data-skip]');

/* 方法 */

function togglePlay () {
    this.paused ? this.play() : this.pause();
}

function updateButton () {
    const icon = this.paused ? '▶️' : '⏸';
    toggle.innerText = icon;
}

function skip () {
    // The provided double value is non-finite
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate () {
    // volume 声音
    // playbackRate 播放速度
    video[this.name] = this.value;
}

function handleProgress () {
    const percent = (video.currentTime / video.duration) * 100;
    progress__filled.style.flexBasis = `${percent}%`;
}
/* 增加监听 */

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay.bind(video));
skipBtns.forEach((element, index, arr) => {
    element.addEventListener('click', skip);
});
ranges.forEach(range => {
    range.addEventListener('change', handleRangeUpdate);
    range.addEventListener('mousemove', handleRangeUpdate);
}); 

video.addEventListener('playing', handleProgress);
