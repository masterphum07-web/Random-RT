// Sound Engine using Web Audio API (100% Standalone, no external MP3 dependencies)
class SoundEffects {
    constructor() {
        this.ctx = null;
        this.muted = false;
        this.volume = 0.8;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    setMuted(muted) {
        this.muted = muted;
    }

    setVolume(val) {
        this.volume = Math.max(0, Math.min(1, val));
    }

    playClick(pitch = 600) {
        if (this.muted) return;
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, this.ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.2 * this.volume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
    }

    playTick(frequencyMultiplier = 1) {
        if (this.muted) return;
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        const baseFreq = 880 * frequencyMultiplier;
        osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.04);

        gain.gain.setValueAtTime(0.35 * this.volume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.04);
    }

    playHeartbeat() {
        if (this.muted) return;
        this.init();
        const t = this.ctx.currentTime;
        this._subThump(t, 85, 0.08, 0.45);
        this._subThump(t + 0.16, 75, 0.12, 0.55);
    }

    _subThump(time, freq, duration, vol) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);
        osc.frequency.exponentialRampToValueAtTime(28, time + duration);

        gain.gain.setValueAtTime(vol * this.volume, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(time);
        osc.stop(time + duration);
    }

    startDrumroll() {
        if (this.muted) return null;
        this.init();

        const bufferSize = this.ctx.sampleRate * 2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(320, this.ctx.currentTime);
        filter.Q.setValueAtTime(4, this.ctx.currentTime);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.01 * this.volume, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.35 * this.volume, this.ctx.currentTime + 2.5);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start();

        return {
            stop: () => {
                try {
                    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
                    setTimeout(() => {
                        try { noise.stop(); } catch(e) {}
                    }, 200);
                } catch(e) {}
            }
        };
    }

    playRiser() {
        if (this.muted) return;
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 1.8);

        gain.gain.setValueAtTime(0.05 * this.volume, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.35 * this.volume, this.ctx.currentTime + 1.6);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.8);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, this.ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(3000, this.ctx.currentTime + 1.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 1.8);
    }

    playFanfare() {
        if (this.muted) return;
        this.init();
        const notes = [
            { f: 523.25, t: 0, d: 0.15 },
            { f: 523.25, t: 0.15, d: 0.15 },
            { f: 523.25, t: 0.3, d: 0.15 },
            { f: 659.25, t: 0.45, d: 0.45 },
            { f: 587.33, t: 0.9, d: 0.2 },
            { f: 659.25, t: 1.1, d: 0.2 },
            { f: 783.99, t: 1.3, d: 0.8 },
            { f: 1046.50, t: 1.4, d: 1.2 }
        ];

        notes.forEach(n => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(n.f, this.ctx.currentTime + n.t);

            gain.gain.setValueAtTime(0.4 * this.volume, this.ctx.currentTime + n.t);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + n.t + n.d);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(this.ctx.currentTime + n.t);
            osc.stop(this.ctx.currentTime + n.t + n.d);
        });
    }
}

window.soundEngine = new SoundEffects();
