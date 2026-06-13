/* ============================================================
   StarJar — HabitStar 風格玻璃瓶星星物理系統
   星星會從瓶口掉進瓶子裡，受重力影響、互相碰撞、堆疊起來。
   ============================================================ */
(function () {
  const PALETTE = {
    normal:   ["#fff3c2", "#ffd45e", "#f0a32a"],
    progress: ["#ffd6ea", "#ff9ed2", "#f25fae"],
    lucky:    ["#d2f1ff", "#8fe7ff", "#3fb6f0"],
    green:    ["#d9fbe6", "#9af0c0", "#46d493"],
    purple:   ["#e8dcff", "#c5a8ff", "#9a6cf5"],
    black:    ["#565a7d", "#2e3150", "#161830"]
  };

  class StarJar {
    constructor(canvas, opts = {}) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.maxStars = opts.maxStars || 60;
      this.starRadius = opts.starRadius || 10;
      this.bodies = [];
      this.queue = [];        // 等待掉落的星星
      this.running = false;
      this.lastSig = "";
      this.spawnTimer = null;
      this.resize();
      this.ro = new ResizeObserver(() => this.resize());
      this.ro.observe(canvas);
    }

    resize() {
      const rect = this.canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.w = rect.width;
      this.h = rect.height;
      this.canvas.width = rect.width * dpr;
      this.canvas.height = rect.height * dpr;
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // 瓶身輪廓參數
      this.cx = this.w / 2;
      this.neckHalf = this.w * 0.19;
      this.bodyHalf = this.w * 0.295;
      this.neckEnd = this.h * 0.175;
      this.shoulderEnd = this.h * 0.30;
      this.floorY = this.h * 0.945;
      this.bodies.forEach((b) => this.constrain(b));
      this.wake();
    }

    /* 瓶身在高度 y 的半寬（玻璃內壁） */
    halfWidthAt(y) {
      if (y <= this.neckEnd) return this.neckHalf;
      if (y < this.shoulderEnd) {
        const t = (y - this.neckEnd) / (this.shoulderEnd - this.neckEnd);
        const s = t * t * (3 - 2 * t); // smoothstep
        return this.neckHalf + (this.bodyHalf - this.neckHalf) * s;
      }
      // 底部圓角
      const roundStart = this.floorY - this.bodyHalf * 0.62;
      if (y > roundStart) {
        const t = Math.min(1, (y - roundStart) / (this.floorY - roundStart));
        return this.bodyHalf * Math.sqrt(Math.max(0.05, 1 - t * t * 0.55));
      }
      return this.bodyHalf;
    }

    /* 同步星星數量：types 為 ['normal','normal','black',...] */
    setStars(types) {
      const capped = types.slice(-this.maxStars);
      const sig = capped.join(",");
      if (sig === this.lastSig) return;

      const current = this.bodies.map((b) => b.type);
      // 計算每種類型的差異
      const count = (arr) => arr.reduce((m, t) => ((m[t] = (m[t] || 0) + 1), m), {});
      const want = count(capped);
      const have = count(current);

      // 移除多餘的
      Object.keys(have).forEach((type) => {
        let excess = (have[type] || 0) - (want[type] || 0);
        while (excess > 0) {
          const idx = this.bodies.findIndex((b) => b.type === type);
          if (idx >= 0) this.bodies.splice(idx, 1);
          excess -= 1;
        }
      });
      // 新增缺少的 → 排隊從瓶口掉落
      clearTimeout(this.spawnTimer);
      this.queue = [];
      Object.keys(want).forEach((type) => {
        let missing = (want[type] || 0) - (have[type] || 0);
        while (missing > 0) {
          this.queue.push(type);
          missing -= 1;
        }
      });
      this.lastSig = sig;
      this.pumpQueue();
      this.wake();
    }

    pumpQueue() {
      if (!this.queue.length) return;
      const type = this.queue.shift();
      this.spawn(type);
      this.spawnTimer = setTimeout(() => this.pumpQueue(), 110);
    }

    spawn(type) {
      const r = this.starRadius * (0.88 + Math.random() * 0.3);
      this.bodies.push({
        type,
        x: this.cx + (Math.random() - 0.5) * this.neckHalf,
        y: -r - Math.random() * 14,
        vx: (Math.random() - 0.5) * 0.8,
        vy: 0.5 + Math.random() * 0.6,
        r,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.12
      });
      this.wake();
    }

    constrain(b) {
      const half = this.halfWidthAt(Math.max(0, b.y)) - b.r;
      if (b.x < this.cx - half) { b.x = this.cx - half; b.vx *= -0.3; }
      if (b.x > this.cx + half) { b.x = this.cx + half; b.vx *= -0.3; }
      if (b.y > this.floorY - b.r) {
        b.y = this.floorY - b.r;
        b.vy *= -0.22;
        b.vx *= 0.92;
        b.vr *= 0.9;
      }
    }

    step() {
      const G = 0.32;
      const bodies = this.bodies;
      for (const b of bodies) {
        b.px = b.x; b.py = b.y;
        b.vy += G;
        b.vx *= 0.995;
        b.x += b.vx;
        b.y += b.vy;
        b.rot += b.vr;
        this.constrain(b);
      }
      // 星星互撞（位置修正法，跑 2 輪收斂）
      for (let iter = 0; iter < 2; iter += 1) {
        for (let i = 0; i < bodies.length; i += 1) {
          for (let j = i + 1; j < bodies.length; j += 1) {
            const a = bodies[i], c = bodies[j];
            const dx = c.x - a.x, dy = c.y - a.y;
            const dist = Math.hypot(dx, dy);
            const min = (a.r + c.r) * 0.92;
            if (dist > 0 && dist < min) {
              const push = (min - dist) / 2;
              const nx = dx / dist, ny = dy / dist;
              a.x -= nx * push; a.y -= ny * push;
              c.x += nx * push; c.y += ny * push;
              const dvx = c.vx - a.vx, dvy = c.vy - a.vy;
              const rel = dvx * nx + dvy * ny;
              if (rel < 0) {
                const imp = rel * 0.42;
                a.vx += nx * imp; a.vy += ny * imp;
                c.vx -= nx * imp; c.vy -= ny * imp;
              }
              this.constrain(a);
              this.constrain(c);
            }
          }
        }
      }
      // 幾乎沒移動的星星 → 強力煞車，讓整堆能真正睡著
      this.allStill = true;
      for (const b of bodies) {
        const moved = Math.hypot(b.x - (b.px ?? b.x), b.y - (b.py ?? b.y));
        if (moved < 0.35) {
          b.vx *= 0.4; b.vy *= 0.4; b.vr *= 0.5;
        } else {
          this.allStill = false;
        }
      }
    }

    isSettled() {
      if (this.queue.length) return false;
      return !!this.allStill && this.bodies.every((b) => b.y > 0);
    }

    drawStar(b) {
      const ctx = this.ctx;
      const [light, mid, dark] = PALETTE[b.type] || PALETTE.normal;
      ctx.save();
      ctx.translate(b.x, b.y);
      // 寶石光暈
      ctx.shadowColor = b.type === "black" ? "rgba(150,130,255,0.85)" : mid;
      ctx.shadowBlur = b.r * 1.5;
      ctx.rotate(b.rot);
      const outer = b.r * 1.22;
      const inner = b.r * 0.52;
      ctx.beginPath();
      for (let i = 0; i < 10; i += 1) {
        const rad = i % 2 === 0 ? outer : inner;
        const ang = (Math.PI / 5) * i - Math.PI / 2;
        const px = Math.cos(ang) * rad;
        const py = Math.sin(ang) * rad;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      const grad = ctx.createRadialGradient(-b.r * 0.3, -b.r * 0.4, b.r * 0.08, 0, 0, outer);
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.28, light);
      grad.addColorStop(0.68, mid);
      grad.addColorStop(1, dark);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = light;
      ctx.globalAlpha = 0.7;
      ctx.stroke();
      ctx.globalAlpha = 1;
      // 玻璃高光點
      ctx.beginPath();
      ctx.arc(-b.r * 0.3, -b.r * 0.4, b.r * 0.18, 0, Math.PI * 2);
      ctx.fillStyle = b.type === "black" ? "rgba(190,180,255,0.7)" : "rgba(255,255,255,0.95)";
      ctx.fill();
      ctx.restore();
      // 大顆星星的閃光十字(不跟著旋轉)
      if (b.r > this.starRadius * 0.98 && b.type !== "black") {
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.strokeStyle = "rgba(255,255,255,0.75)";
        ctx.lineWidth = 1;
        const s = b.r * 0.9;
        ctx.beginPath();
        ctx.moveTo(0, -s); ctx.lineTo(0, s);
        ctx.moveTo(-s, 0); ctx.lineTo(s, 0);
        ctx.stroke();
        ctx.restore();
      }
    }

    render() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.w, this.h);
      for (const b of this.bodies) this.drawStar(b);
      // 瓶內暖光:像參考圖那樣從瓶底透出來
      const gy = this.floorY - this.h * 0.06;
      const glow = ctx.createRadialGradient(this.cx, gy, 0, this.cx, gy, this.bodyHalf * 1.15);
      glow.addColorStop(0, "rgba(255, 214, 150, 0.34)");
      glow.addColorStop(0.55, "rgba(255, 185, 138, 0.14)");
      glow.addColorStop(1, "rgba(255, 185, 138, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, this.w, this.h);
    }

    wake() {
      this.idleFrames = 0;
      if (this.running) return;
      this.running = true;
      const loop = () => {
        this.step();
        this.render();
        if (this.isSettled()) {
          this.idleFrames = (this.idleFrames || 0) + 1;
        } else {
          this.idleFrames = 0;
        }
        if (this.idleFrames > 45) {
          this.running = false;
          this.render();
          return;
        }
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }
  }

  window.StarJar = StarJar;
})();
