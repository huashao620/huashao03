const aliceTumbling = (scale = 1) => [
  { transform: `translate3D(0, 0, 0) rotate(0) scale(${scale})`, opacity: 1 },
  { transform: `translate3D(100px, 100px, 0) rotate(360deg) scale(0)`, opacity: 0 }
];

const aliceTiming = (duration) => ({
  duration: duration || 2000,
  iterations: 1,
  fill: 'forwards'
});

const aliceElements = document.querySelectorAll("#alice-container img");
let animations = [];

async function animateAlice(alice, keyframes, timing) {
  if (!alice) return Promise.reject(new Error('元素未找到'));
  const animation = alice.animate(keyframes, timing);
  animations.push(animation);
  return animation.finished;
}

async function startAnimation() {
  const duration = parseInt(document.getElementById("duration-input").value) || 2000;
  const scale = parseFloat(document.getElementById("scale-input").value) || 1;

  await Promise.all(Array.from(aliceElements).map(alice => 
    animateAlice(alice, aliceTumbling(scale), aliceTiming(duration))
  ));
  console.log("所有动画完成！");
}

function pauseAnimation() {
  animations.forEach(anim => anim.pause());
  console.log("所有动画暂停！");
}

function resumeAnimation() {
  animations.forEach(anim => anim.play());
  console.log("所有动画继续！");
}

// 添加按钮和输入框
document.getElementById("start-button").addEventListener("click", startAnimation);
document.getElementById("pause-button").addEventListener("click", pauseAnimation);
document.getElementById("resume-button").addEventListener("click", resumeAnimation);

