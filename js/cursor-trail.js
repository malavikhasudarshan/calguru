/**
 * Bear emoji cursor trail — follows the cursor
 */
(function () {
  const BEAR = "🐻";
  const COUNT = 14;
  const SIZE = 18;
  const MAX_POSITIONS = 25;

  const trail = document.createElement("div");
  trail.id = "bear-trail";
  trail.style.cssText = [
    "position:fixed",
    "inset:0",
    "pointer-events:none",
    "z-index:99999",
    "overflow:hidden"
  ].join(";");

  const positions = [];

  for (let i = 0; i < COUNT; i++) {
    const el = document.createElement("span");
    el.textContent = BEAR;
    el.style.cssText = [
      "position:absolute",
      "left:0",
      "top:0",
      "font-size:" + SIZE + "px",
      "line-height:1",
      "transform:translate(-50%,-50%)",
      "opacity:" + (1 - (i / COUNT) * 0.65),
      "transition:left 0.12s ease-out, top 0.12s ease-out"
    ].join(";");
    trail.appendChild(el);
  }

  document.body.appendChild(trail);
  const bears = trail.querySelectorAll("span");

  document.addEventListener("mousemove", function (e) {
    positions.push({ x: e.clientX, y: e.clientY });
    if (positions.length > MAX_POSITIONS) positions.shift();
  });

  function update() {
    const n = positions.length;
    bears.forEach(function (bear, i) {
      const j = n - 1 - i;
      const p = j >= 0 ? positions[j] : null;
      if (p) {
        bear.style.left = p.x + "px";
        bear.style.top = p.y + "px";
        bear.style.visibility = "visible";
      } else {
        bear.style.visibility = "hidden";
      }
    });
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
})();
