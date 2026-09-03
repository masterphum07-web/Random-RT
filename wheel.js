// Canvas Wheel Component with Physics, Lighting and Suspense
class LuckyWheel {
    constructor(canvasId, onWinnerSelected, onTick) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.onWinnerSelected = onWinnerSelected;
        this.onTick = onTick;

        this.items = [];
        this.currentAngle = 0;
        this.isSpinning = false;
        this.lastTickIndex = -1;

        this.colorPalette = [
            '#FF2E93', '#FF8A00', '#FFD600', '#00E676', 
            '#00E5FF', '#7C4DFF', '#E040FB', '#FF5252',
            '#00B0FF', '#76FF03', '#F50057', '#651FFF'
        ];

        this.setupDPI();
        window.addEventListener('resize', () => {
            this.setupDPI();
            this.draw();
        });
    }

    setupDPI() {
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        const size = Math.min(rect.width || 540, 600);
        this.canvas.width = size * dpr;
        this.canvas.height = size * dpr;
        this.ctx.scale(dpr, dpr);
        this.size = size;
        this.center = size / 2;
        this.radius = (size / 2) - 24;
    }

    setItems(items) {
        this.items = items.filter(i => i.active !== false);
        this.draw();
    }

    draw() {
        const ctx = this.ctx;
        const c = this.center;
        const r = this.radius;

        ctx.clearRect(0, 0, this.size, this.size);

        if (this.items.length === 0) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(c, c, r, 0, Math.PI * 2);
            ctx.fillStyle = '#1e293b';
            ctx.fill();
            ctx.lineWidth = 6;
            ctx.strokeStyle = '#334155';
            ctx.stroke();

            ctx.fillStyle = '#94a3b8';
            ctx.font = '600 18px "Prompt", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('กรุณาเพิ่มรายชื่อเพื่อเริ่มสุ่ม', c, c);
            ctx.restore();
            return;
        }

        const numSlices = this.items.length;
        const sliceAngle = (Math.PI * 2) / numSlices;

        // Outer Glow Ring & Rim
        ctx.save();
        ctx.beginPath();
        ctx.arc(c, c, r + 8, 0, Math.PI * 2);
        ctx.lineWidth = 14;
        const rimGrad = ctx.createLinearGradient(0, 0, this.size, this.size);
        rimGrad.addColorStop(0, '#ffd700');
        rimGrad.addColorStop(0.5, '#ff8a00');
        rimGrad.addColorStop(1, '#ff007f');
        ctx.strokeStyle = rimGrad;
        ctx.stroke();

        // LED bulbs
        const totalBulbs = 24;
        const now = Date.now() / 200;
        for (let i = 0; i < totalBulbs; i++) {
            const bAngle = (i * (Math.PI * 2) / totalBulbs) + (this.isSpinning ? this.currentAngle : 0);
            const bx = c + (r + 8) * Math.cos(bAngle);
            const by = c + (r + 8) * Math.sin(bAngle);
            const bulbLit = Math.floor(now + i) % 2 === 0;

            ctx.beginPath();
            ctx.arc(bx, by, 4, 0, Math.PI * 2);
            ctx.fillStyle = bulbLit ? '#ffffff' : '#ffd700';
            ctx.shadowColor = bulbLit ? '#00e5ff' : '#ff9100';
            ctx.shadowBlur = bulbLit ? 10 : 3;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
        ctx.restore();

        // Draw Slices
        for (let i = 0; i < numSlices; i++) {
            const startAngle = this.currentAngle + (i * sliceAngle);
            const endAngle = startAngle + sliceAngle;
            const item = this.items[i];
            const color = item.color || this.colorPalette[i % this.colorPalette.length];

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(c, c);
            ctx.arc(c, c, r, startAngle, endAngle);
            ctx.closePath();

            const sliceGrad = ctx.createRadialGradient(c, c, 10, c, c, r);
            sliceGrad.addColorStop(0, '#ffffff');
            sliceGrad.addColorStop(0.15, color);
            sliceGrad.addColorStop(1, this._darkenColor(color, 25));
            ctx.fillStyle = sliceGrad;
            ctx.fill();

            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.stroke();

            // Text inside slice
            ctx.save();
            ctx.translate(c, c);
            ctx.rotate(startAngle + sliceAngle / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
            ctx.shadowBlur = 4;

            const fontSize = Math.max(12, Math.min(20, Math.floor(400 / numSlices)));
            ctx.font = `700 ${fontSize}px "Prompt", sans-serif`;

            let label = item.name;
            if (item.code) {
                label = `[${item.code}] ${item.name}`;
            }
            if (label.length > 18) {
                label = label.substring(0, 16) + '...';
            }

            ctx.fillText(label, r - 24, fontSize / 3);
            ctx.restore();

            ctx.restore();
        }

        // Center Hub
        ctx.save();
        ctx.beginPath();
        ctx.arc(c, c, 38, 0, Math.PI * 2);
        const centerGrad = ctx.createRadialGradient(c - 8, c - 8, 2, c, c, 38);
        centerGrad.addColorStop(0, '#ffffff');
        centerGrad.addColorStop(0.5, '#334155');
        centerGrad.addColorStop(1, '#0f172a');
        ctx.fillStyle = centerGrad;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#ffd700';
        ctx.stroke();

        ctx.fillStyle = '#ffd700';
        ctx.font = '20px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('★', c, c);
        ctx.restore();

        // Pointer
        this.drawPointer();
    }

    drawPointer() {
        const ctx = this.ctx;
        const c = this.center;
        const top = c - this.radius;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(c - 16, top - 18);
        ctx.lineTo(c + 16, top - 18);
        ctx.lineTo(c, top + 14);
        ctx.closePath();

        const grad = ctx.createLinearGradient(c - 16, top - 18, c + 16, top + 14);
        grad.addColorStop(0, '#ff0055');
        grad.addColorStop(1, '#ff7700');
        ctx.fillStyle = grad;
        ctx.shadowColor = '#ff0055';
        ctx.shadowBlur = 12;
        ctx.fill();

        ctx.lineWidth = 3;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(c, top - 16, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        ctx.restore();
    }

    spin(targetIndex = null) {
        if (this.isSpinning || this.items.length === 0) return;

        this.isSpinning = true;
        const numSlices = this.items.length;
        const sliceAngle = (Math.PI * 2) / numSlices;

        if (targetIndex === null || targetIndex < 0 || targetIndex >= numSlices) {
            targetIndex = Math.floor(Math.random() * numSlices);
        }

        const minSpins = 6 + Math.floor(Math.random() * 3);
        const pointerAngle = -Math.PI / 2;
        const sliceOffset = (Math.random() * 0.7 + 0.15) * sliceAngle;
        const desiredFinalAngle = pointerAngle - (targetIndex * sliceAngle + sliceOffset);

        const currentMod = this.currentAngle % (Math.PI * 2);
        let delta = desiredFinalAngle - currentMod;
        while (delta < minSpins * Math.PI * 2) {
            delta += Math.PI * 2;
        }

        const startAngle = this.currentAngle;
        const totalDuration = 7000;
        const startTime = performance.now();

        let heartbeatInterval = null;
        let drumroll = null;
        if (window.soundEngine) {
            drumroll = window.soundEngine.startDrumroll();
        }

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / totalDuration, 1);

            const easeOut = 1 - Math.pow(1 - progress, 4.5);
            this.currentAngle = startAngle + delta * easeOut;

            this.checkTick(numSlices, sliceAngle, 1 - progress);

            if (elapsed > 4500 && !heartbeatInterval) {
                heartbeatInterval = setInterval(() => {
                    if (this.isSpinning && window.soundEngine) {
                        window.soundEngine.playHeartbeat();
                    }
                }, 400);
            }

            this.draw();

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                if (heartbeatInterval) clearInterval(heartbeatInterval);
                if (drumroll) drumroll.stop();
                this.isSpinning = false;
                
                const winner = this.getCurrentWinner();
                if (this.onWinnerSelected) {
                    this.onWinnerSelected(winner, targetIndex);
                }
            }
        };

        requestAnimationFrame(animate);
    }

    checkTick(numSlices, sliceAngle, speedFactor) {
        const normAngle = (( -Math.PI / 2 - this.currentAngle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        const index = Math.floor(normAngle / sliceAngle) % numSlices;

        if (index !== this.lastTickIndex) {
            this.lastTickIndex = index;
            if (this.onTick) {
                this.onTick(speedFactor);
            }
        }
    }

    getCurrentWinner() {
        if (this.items.length === 0) return null;
        const numSlices = this.items.length;
        const sliceAngle = (Math.PI * 2) / numSlices;
        const normAngle = (( -Math.PI / 2 - this.currentAngle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        const index = Math.floor(normAngle / sliceAngle) % numSlices;
        return this.items[index];
    }

    _darkenColor(hex, percent) {
        let num = parseInt(hex.replace('#', ''), 16);
        let amt = Math.round(2.55 * percent);
        let R = (num >> 16) - amt;
        let G = (num >> 8 & 0x00FF) - amt;
        let B = (num & 0x0000FF) - amt;
        return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }
}

window.LuckyWheel = LuckyWheel;
