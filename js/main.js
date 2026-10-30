(() => {
  'use strict';

  // ====== Thông tin sự kiện (sửa ở đây nếu đổi ngày / giờ) ======
  const EVENT = {
    title: 'Lễ tốt nghiệp của Nguyễn Viết Hoàng',
    day: new Date(2026, 10, 7),                       // 07.11.2026 (tháng tính từ 0)
    calStart: '20261107T053000Z',                     // 12h30 giờ VN
    calEnd: '20261107T090000Z',
    place: 'Trường Đại học FPT TP.HCM, Lô E2a-7, Đường D1, Khu Công nghệ cao, TP.HCM',
  };
  const LINES = [
    'Mình tốt nghiệp rồi!',
    'Cảm ơn mọi người nhiều!',
    'Hẹn gặp bạn ngày 07.11 nhé!',
    'Tung mũ nàooo!',
    'Ra trường rồi, yeahhh!',
    'Nhớ mang hoa cho mình nha',
  ];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // luôn bắt đầu từ đầu trang, không để trình duyệt nhớ vị trí cuộn cũ
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  const toTop = () => scrollTo({ top: 0, behavior: 'instant' });
  toTop();
  addEventListener('load', toTop);

  // ====== Pixel art ======
  const PAL = {
    K: '#183a2c', H: '#263248', Y: '#ffcf3a', B: '#4a2e1f', S: '#ffdcb8', E: '#183a2c',
    P: '#ff9fb6', M: '#d9506a', W: '#ffffff', G: '#2b3a63', g: '#3e5290', O: '#22c178',
    D: '#fff6da', d: '#ecdcae', R: '#ef4b5c', N: '#3b2a20', w: '#d6f0ff', p: '#ff6f9f',
    h: '#ffd0e0', y: '#fff3a6', A: '#0d7247', L: '#1b2433', l: '#dcf3ff',
    C: '#8a5a2b', V: '#c4b5fd',
  };

  const CAP = [
    '........KKKKKKKKKK......',
    '.....KKKHHHHHHHHHHKKK...',
    '..KKKHHHHHHHYYHHHHHHHKKK',
    '.....KKKHHHHHYYYYYYYKK..',
    '......KKKKKKKKKKKKKK.Y..',
    '......KHHHHHHHHHHHHK.Y..',
    '......KKKKKKKKKKKKKK.Y..',
    '....................YYY.',
    '....................YYY.',
    '....................Y.Y.',
  ];
  const BODY = [
    '........................',
    '........................',
    '........................',
    '........................',
    '.........KKKKKKKK.......',
    '.......KKBBBBBBBBKK.....',
    '......KBBBBBBBBBBBBK....',
    '......KBBSSBBBBSSBBK....',
    '......KBSSSSSSSSSSBK....',
    '......KSLLLLLLLLLLSK....',
    '......KLLElLSSLlELLK....',
    '......KSLElLSSLlELSK....',
    '......KPLLLLSSLLLLPK....',
    '.......KSSSSMMSSSSK.....',
    '........KKWWWWWWKK......',
    '.....KKGGOOWWWWOOGGKK...',
    '....KGGGGOOWWWWOOGGGGK..',
    '...KGGgGGOOOWWOOOGGgGGK.',
    '...KGgGGGGOOOOOOGGGGgGK.',
    '..KGGKKKKKKKKKKKKKKKKGGK',
    '..KGSSDDDDDDRRDDDDDDSSGK',
    '..KGSSdddddRRRRdddddSSGK',
    '..KGGKKKKKKKKKKKKKKKKGGK',
    '...KGGGgGGGGOOGGGGgGGGK.',
    '...KGGGgGGGGOOGGGGgGGGK.',
    '...KGGGgGGGGGGGGGGgGGGK.',
    '...KGGGGGGGGGGGGGGGGGGK.',
    '...KKKKKKKKKKKKKKKKKKKK.',
    '........KNNK..KNNK......',
    '.......KNNNK..KNNNK.....',
  ];
  const withRows = (base, patch) => base.map((r, i) => patch[i] || r);
  // mắt nhắm (chớp) và mắt cười ^^ — vẫn giữ gọng kính
  const BLINK = withRows(BODY, {
    10: '......KLLllLSSLllLLK....',
    11: '......KSLKKLSSLKKLSK....',
  });
  const HAPPY = withRows(BODY, {
    10: '......KLLKKLSSLKKLLK....',
    11: '......KSLllLSSLllLSK....',
    13: '.......KSSSMMMMSSSK.....',
  });
  const ICONS = {
    cloud: [
      '....wwww........',
      '...wWWWWw..www..',
      '..wWWWWWWwwWWWw.',
      '.wWWWWWWWWWWWWWw',
      'wWWWWWWWWWWWWWWw',
      '.wwwwwwwwwwwwww.',
    ],
    heart: [
      '.KK.KK.',
      'KphKppK',
      'KpppppK',
      '.KpppK.',
      '..KpK..',
      '...K...',
    ],
    spark: [
      '...Y...',
      '...Y...',
      '..YyY..',
      'YYyyyYY',
      '..YyY..',
      '...Y...',
      '...Y...',
    ],
    star: [
      '....K....',
      '...KYK...',
      'KKKKYKKKK',
      'KYYYyYYYK',
      '.KYYYYYK.',
      '..KYYYK..',
      '.KYYKYYK.',
      'KYK...KYK',
      'KK.....KK',
    ],
    arrow: [
      '..KKK..',
      '..KAK..',
      '..KAK..',
      'KKKAKKK',
      '.KAAAK.',
      '..KAK..',
      '...K...',
    ],
    cap: CAP.slice(0, 7).map(r => r.slice(2)).concat(['......................']),
    laptop: [
      '.KKKKKKKKKK.',
      '.KwwwwwwwwK.',
      '.KwOOwwwwwK.',
      '.KwwwOOOwwK.',
      '.KwOOOwwwwK.',
      '.KwwwwwwwwK.',
      '.KKKKKKKKKK.',
      'KddddddddddK',
      'KKKKKKKKKKKK',
    ],
    coffee: [
      '...l..l.....',
      '..l..l......',
      '...l..l.....',
      '.KKKKKKKK...',
      '.KWWWWWWKKK.',
      '.KWCCCCWK.K.',
      '.KWWWWWWK.K.',
      '.KWWWWWWKKK.',
      '..KWWWWK....',
      '...KKKK.....',
    ],
    bag: [
      '....KKKK....',
      '....K..K....',
      '.KKKKKKKKKK.',
      '.KCCCCCCCCK.',
      '.KCCCYYCCCK.',
      '.KKKKYYKKKK.',
      '.KCCCCCCCCK.',
      '.KCCCCCCCCK.',
      '.KKKKKKKKKK.',
    ],
    bug: [
      '..K......K..',
      '...K....K...',
      '...KKKKKK...',
      '..KRRRRRRK..',
      '.KRWKRRWKRK.',
      'KKRRRRRRRRKK',
      '..KRRKKRRK..',
      'KKRRRRRRRRKK',
      '..KRRRRRRK..',
      '.K.KKKKKK.K.',
    ],
    trophy: [
      '.KKKKKKKKKK.',
      'KKYYYYyYYYKK',
      'KYKYYYyYYKYK',
      'KYKYYYYYYKYK',
      '.KKYYYYYYKK.',
      '...KYYYYK...',
      '....KYYK....',
      '....KYYK....',
      '...KKKKKK...',
      '..KYYYYYYK..',
      '..KKKKKKKK..',
    ],
    lock: [
      '..KKKK..',
      '.K....K.',
      '.K....K.',
      'KKKKKKKK',
      'KYYYYYYK',
      'KYYKKYYK',
      'KYYYYYYK',
      'KKKKKKKK',
    ],
  };

  function pixelURL(rows) {
    const w = Math.max(...rows.map(r => r.length)), h = rows.length;
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const g = c.getContext('2d');
    rows.forEach((row, y) => [...row].forEach((ch, x) => {
      if (ch === '.' || !PAL[ch]) return;
      g.fillStyle = PAL[ch];
      g.fillRect(x, y, 1, 1);
    }));
    return c.toDataURL();
  }

  const URL_ = {};
  for (const k in ICONS) URL_[k] = pixelURL(ICONS[k]);
  document.querySelectorAll('img[data-px]').forEach(img => { img.src = URL_[img.dataset.px]; });

  const FRAME = { idle: pixelURL(BODY), blink: pixelURL(BLINK), happy: pixelURL(HAPPY) };
  // đệm cho bằng chiều cao thân để hai lớp ảnh khớp nhau
  const capURL = pixelURL(CAP.concat(Array(BODY.length - CAP.length).fill('.'.repeat(24))));

  const spBody = document.getElementById('spBody');
  const spCap = document.getElementById('spCap');
  const sprite = document.getElementById('sprite');
  const bubble = document.getElementById('bubble');
  spBody.src = FRAME.idle;
  spCap.src = capURL;
  // nhân vật đầy đủ (mũ ghép lên thân) cho footer, hồ sơ, hành trình
  const withCap = rows => rows.map((row, y) =>
    [...row].map((ch, x) => (CAP[y] && CAP[y][x] !== '.') ? CAP[y][x] : ch).join(''));
  const FULL = pixelURL(withCap(BODY)), FULL_HAPPY = pixelURL(withCap(HAPPY));
  for (const id of ['walker', 'rider', 'pfSprite', 'rsvpChar']) document.getElementById(id).src = FULL;

  let happyUntil = 0;
  (function blinkLoop() {
    setTimeout(() => {
      if (Date.now() > happyUntil) {
        spBody.src = FRAME.blink;
        setTimeout(() => { if (Date.now() > happyUntil) spBody.src = FRAME.idle; }, 140);
      }
      blinkLoop();
    }, 2200 + Math.random() * 2400);
  })();

  // ====== Bong bóng thoại ======
  let lineIdx = 0, typing;
  function say(text) {
    clearInterval(typing);
    bubble.style.animation = 'none'; void bubble.offsetWidth; bubble.style.animation = '';
    let i = 0;
    bubble.textContent = '';
    typing = setInterval(() => {
      bubble.textContent = text.slice(0, ++i);
      if (i >= text.length) clearInterval(typing);
    }, 38);
  }

  sprite.addEventListener('click', () => {
    sprite.classList.remove('jump', 'toss');
    void sprite.offsetWidth;
    sprite.classList.add('jump', 'toss');
    happyUntil = Date.now() + 1300;
    spBody.src = FRAME.happy;
    setTimeout(() => { if (Date.now() >= happyUntil) spBody.src = FRAME.idle; }, 1350);
    lineIdx = (lineIdx + 1) % LINES.length;
    say(LINES[lineIdx]);
    const r = sprite.getBoundingClientRect();
    setTimeout(() => burst(r.left + r.width / 2, r.top + r.height * .1, 46), 350);
  });
  sprite.addEventListener('animationend', e => {
    if (e.animationName === 'jump') sprite.classList.remove('jump');
    if (e.animationName === 'toss') sprite.classList.remove('toss');
  }, true);

  // ====== Tiêu đề nhảy chữ ======
  let n = 0;
  document.querySelectorAll('.wave').forEach(el => {
    el.innerHTML = [...el.textContent].map(ch =>
      ch === ' ' ? ' ' : `<span class="ch" style="--i:${n++}">${ch}</span>`).join('');
  });

  // ====== Đếm ngược ======
  (function countdown() {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const d = Math.round((EVENT.day - today) / 864e5);
    const pre = document.getElementById('cdPre'), num = document.getElementById('cdNum'), post = document.getElementById('cdPost');
    if (d > 0) { pre.textContent = 'Còn'; num.textContent = d; post.textContent = 'ngày'; }
    else if (d === 0) { pre.textContent = 'Chính là'; num.textContent = 'hôm nay'; post.textContent = '!'; }
    else { pre.textContent = 'Đã diễn ra'; num.textContent = -d; post.textContent = 'ngày trước'; }
  })();

  // ====== Link Google Calendar ======
  document.getElementById('calBtn').href = 'https://calendar.google.com/calendar/render?' + new URLSearchParams({
    action: 'TEMPLATE', text: EVENT.title, dates: `${EVENT.calStart}/${EVENT.calEnd}`, location: EVENT.place,
    details: 'Hẹn gặp bạn ở trường nhé!',
  });

  // ====== Hiện dần khi cuộn ======
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add(e.target.id === 'envelope' ? 'open' : 'in');
    if (e.target.id === 'envelope') {
      setTimeout(() => {
        const r = e.target.getBoundingClientRect();
        burst(r.left + r.width / 2, Math.max(r.top + 40, 60), 70);
      }, 1200);
    }
    io.unobserve(e.target);
  }), { threshold: .25 });
  document.querySelectorAll('.reveal, #envelope').forEach(el => io.observe(el));

  document.querySelectorAll('.badges li').forEach((li, i) => li.style.setProperty('--i', i));

  // ====== Hành trình: đường vàng + nhân vật chạy theo cuộn ======
  const levels = document.getElementById('levels');
  const levelItems = [...levels.querySelectorAll('.level')];
  function onScroll() {
    const r = levels.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * .6 - r.top) / r.height));
    levels.style.setProperty('--p', p.toFixed(4));
    const tip = r.top + r.height * p;
    levelItems.forEach(li => li.classList.toggle('done', li.getBoundingClientRect().top + 30 <= tip));
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  // ====== Bạn sẽ đến chứ? ======
  const yesBtn = document.getElementById('yesBtn'), noBtn = document.getElementById('noBtn');
  const rsvpMsg = document.getElementById('rsvpMsg'), rsvpChar = document.getElementById('rsvpChar');
  const rsvpSub = document.querySelector('.rsvp-sub');
  const NO_TEXTS = [
    'Hông bấm được đâu~', 'Bắt mình đi nè!', 'Suy nghĩ lại nha?', 'Năn nỉ đó…',
    'Mình đang nhỏ lại nè!', 'Sắp biến mất rồi…', 'Cứu mình với!', 'Bye bye~',
  ];
  const MAX_DODGE = NO_TEXTS.length;
  let dodges = 0;
  // nút từ chối xoay vòng, thu nhỏ rồi biến mất
  function vanishNo(subText) {
    if (noBtn.disabled) return;
    dodges = MAX_DODGE;
    noBtn.style.rotate = '540deg';
    noBtn.style.scale = '0';
    noBtn.style.opacity = '0';
    noBtn.disabled = true;
    const r = noBtn.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, 30);
    setTimeout(() => {
      noBtn.hidden = true;
      if (subText) rsvpSub.textContent = subText;
    }, 600);
  }
  function sayYes(btn) {
    vanishNo('Cảm ơn bạn đã nhận lời nha!');
    rsvpMsg.hidden = false;
    rsvpMsg.textContent = 'Yayyy! Hẹn gặp bạn ngày 07.11 nha!';
    rsvpMsg.style.animation = 'none'; void rsvpMsg.offsetWidth; rsvpMsg.style.animation = '';
    rsvpChar.src = FULL_HAPPY;
    setTimeout(() => { rsvpChar.src = FULL; }, 1600);
    document.querySelector('.badges li.locked')?.classList.add('unlocked');
    const r = btn.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top, 80);
    setTimeout(() => burst(innerWidth * .2, innerHeight * .4, 40), 250);
    setTimeout(() => burst(innerWidth * .8, innerHeight * .4, 40), 450);
  }
  yesBtn.addEventListener('click', () => sayYes(yesBtn));
  // nút từ chối: chạy trốn, nhỏ dần rồi biến mất; nút đồng ý to dần lên
  function dodge(e) {
    e.preventDefault();
    if (dodges >= MAX_DODGE) return;
    dodges++;
    yesBtn.style.scale = 1 + dodges * .06;
    if (dodges === MAX_DODGE) {
      noBtn.textContent = NO_TEXTS[dodges - 1];
      vanishNo('Nút từ chối chạy mất tiêu rồi, chỉ còn một lựa chọn thôi nha!');
      return;
    }
    const box = noBtn.parentElement.getBoundingClientRect();
    const x = (Math.random() - .5) * Math.min(box.width * .9, 420);
    const y = (Math.random() - .5) * 110;
    noBtn.style.translate = `${x.toFixed(0)}px ${y.toFixed(0)}px`;
    noBtn.style.rotate = `${((Math.random() - .5) * 40).toFixed(0)}deg`;
    noBtn.style.scale = Math.max(.3, 1 - dodges * .1);
    noBtn.textContent = NO_TEXTS[dodges - 1];
  }
  noBtn.addEventListener('click', dodge);

  // ====== Canvas hiệu ứng (confetti + vệt chuột) ======
  const fx = document.getElementById('fx'), fg = fx.getContext('2d');
  const bg = document.getElementById('bg'), bgc = bg.getContext('2d');
  let W = 0, H = 0, DPR = 1;
  function resize() {
    DPR = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    for (const c of [fx, bg]) {
      c.width = W * DPR; c.height = H * DPR;
      c.style.width = W + 'px'; c.style.height = H + 'px';
      c.getContext('2d').setTransform(DPR, 0, 0, DPR, 0, 0);
    }
  }
  resize();
  addEventListener('resize', resize);

  const COLORS = ['#ffd34e', '#ff8fb8', '#22c178', '#ffffff', '#7dd3fc', '#c4b5fd', '#ff6f9f'];
  const parts = [];
  function burst(x, y, count) {
    if (reduce) return;
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2, s = 3 + Math.random() * 7;
      parts.push({
        x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 5, g: .22, life: 90 + Math.random() * 50,
        size: 5 + Math.random() * 6, rot: Math.random() * 6, vr: (Math.random() - .5) * .3,
        color: COLORS[i % COLORS.length], shape: i % 5 === 0 ? 'heart' : 'sq',
      });
    }
  }
  function heartPath(c, s) {
    c.beginPath();
    c.moveTo(0, s * .3);
    c.bezierCurveTo(-s, -s * .4, -s * .4, -s, 0, -s * .35);
    c.bezierCurveTo(s * .4, -s, s, -s * .4, 0, s * .3);
    c.fill();
  }

  let lastTrail = 0;
  if (matchMedia('(pointer: fine)').matches && !reduce) {
    addEventListener('pointermove', e => {
      const now = performance.now();
      if (now - lastTrail < 40) return;
      lastTrail = now;
      parts.push({
        x: e.clientX, y: e.clientY, vx: (Math.random() - .5) * 1.2, vy: -.4 - Math.random(), g: .03, life: 40,
        size: 4 + Math.random() * 3, rot: 0, vr: 0, color: COLORS[(Math.random() * COLORS.length) | 0], shape: 'sq',
      });
    });
  }

  // Lá + cánh hoa rơi, lấp lánh
  const LEAF = ['#16a86e', '#2fc27e', '#7be3a8', '#ffffff', '#ffc2d8', '#fff3a6'];
  const leaves = Array.from({ length: Math.round(Math.min(34, innerWidth / 40)) }, () => newLeaf(true));
  function newLeaf(anywhere) {
    return {
      x: Math.random() * innerWidth, y: anywhere ? Math.random() * innerHeight : -20,
      vy: .35 + Math.random() * .7, sway: Math.random() * 6, sp: .01 + Math.random() * .02,
      r: Math.random() * 6, vr: (Math.random() - .5) * .03, s: 5 + Math.random() * 7,
      c: LEAF[(Math.random() * LEAF.length) | 0], tw: Math.random() < .3,
    };
  }

  function frame(t) {
    // nền
    bgc.clearRect(0, 0, W, H);
    for (const L of leaves) {
      L.y += L.vy; L.sway += L.sp; L.r += L.vr;
      const x = L.x + Math.sin(L.sway) * 26;
      if (L.y > H + 20) Object.assign(L, newLeaf(false));
      bgc.save();
      bgc.translate(x, L.y);
      if (L.tw) {
        const k = .5 + .5 * Math.sin(t / 300 + L.sway * 4);
        bgc.globalAlpha = .4 + .6 * k;
        bgc.fillStyle = '#fffbe0';
        const s = L.s * (.5 + k * .5);
        bgc.fillRect(-s / 2, -1, s, 2); bgc.fillRect(-1, -s / 2, 2, s);
      } else {
        bgc.rotate(L.r + Math.sin(L.sway) * .6);
        bgc.globalAlpha = .85;
        bgc.fillStyle = L.c;
        bgc.beginPath(); bgc.ellipse(0, 0, L.s, L.s * .48, 0, 0, Math.PI * 2); bgc.fill();
      }
      bgc.restore();
    }

    // confetti
    fg.clearRect(0, 0, W, H);
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.vx *= .985; p.vy += p.g; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      if (--p.life <= 0 || p.y > H + 30) { parts.splice(i, 1); continue; }
      fg.save();
      fg.globalAlpha = Math.min(1, p.life / 30);
      fg.translate(p.x, p.y); fg.rotate(p.rot);
      fg.fillStyle = p.color;
      if (p.shape === 'heart') heartPath(fg, p.size);
      else fg.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * .8);
      fg.restore();
    }
    if (!reduce) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // ====== Mở phong bì đầu trang ======
  const intro = document.getElementById('intro');
  const openBtn = document.getElementById('openBtn');
  openBtn.addEventListener('click', () => {
    if (openBtn.classList.contains('open')) return;
    openBtn.classList.add('open');
    toTop();
    const r = openBtn.getBoundingClientRect();
    setTimeout(() => burst(r.left + r.width / 2, r.top + r.height / 3, 90), 500);
    setTimeout(() => {
      intro.classList.add('gone');
      toTop();
      document.body.classList.remove('locked');
      say(LINES[0]);
    }, 1500);
  });
})();
