// Main Application Logic with LocalStorage, Google Sheets parsing, Confetti, and State Management
(function () {
    const DEFAULT_MEMBERS = [
        {id:'1',code:'034',name:'นางสาว พัชราภา บุญมากุล',active:true},{id:'2',code:'001',name:'นางสาว กนกพร มูฮำหมัด',active:true},{id:'3',code:'002',name:'นาย กันติทัต กุยแก้ว',active:true},{id:'4',code:'003',name:'นางสาว กัลยกร เพียรถาวรกิจ',active:true},{id:'5',code:'004',name:'นางสาว จินตนา ศรีเริ่มสกุล',active:true},{id:'6',code:'005',name:'นางสาว จิรนุช พลขันธ์',active:true},{id:'7',code:'006',name:'นางสาว ชนติกานต์ สมตระกูล',active:true},{id:'8',code:'007',name:'นางสาว ซุลฟา อุมา',active:true},{id:'9',code:'008',name:'นางสาว ณัฏฐ์นรี กระแสสืบ',active:true},{id:'10',code:'009',name:'นางสาว ดอกรัก อิสระอังกูร',active:true},{id:'11',code:'010',name:'นาย ติณณ์ถิรวิทย์ เกื้อรอด',active:true},{id:'12',code:'011',name:'นางสาว ธนัญภรณ์ ทวีมหาเกียรติ',active:true},{id:'13',code:'012',name:'นางสาว ธิญาดา แก้วขุนทอง',active:true},{id:'14',code:'013',name:'นางสาว ธิญาดา งามเลิศ',active:true},{id:'15',code:'014',name:'นางสาว นงค์ณภัทร สาฆ้อง',active:true},{id:'16',code:'015',name:'นางสาว นฏกร ไหมแก้ว',active:true},{id:'17',code:'016',name:'นางสาว นภัสวรรณ์ พันทา',active:true},{id:'18',code:'017',name:'นางสาว นภัสวรรณ ถิรบวรสกุล',active:true},{id:'19',code:'018',name:'นาย บดินทร์ การุณเวทย์',active:true},{id:'20',code:'019',name:'นางสาว บุษกร ภิรมย์',active:true},{id:'21',code:'020',name:'นางสาว ประภัสสร วงษ์กำภู',active:true},{id:'22',code:'021',name:'นางสาว ประภัสสร วันดอนแดง',active:true},{id:'23',code:'022',name:'นางสาว ปวีณ์ธิดา สุขรัตน์',active:true},{id:'24',code:'023',name:'นางสาว ปิยะธิดา ศรีคำยศ',active:true},{id:'25',code:'024',name:'นางสาว ปิยะมาศ เนตฝาง',active:true},{id:'26',code:'025',name:'นางสาว ปิยะมาศ เสือสวย',active:true},{id:'27',code:'026',name:'นางสาว ปุญญิศา สายตรี',active:true},{id:'28',code:'027',name:'นางสาว พนิตพิชา สงหนู',active:true},{id:'29',code:'029',name:'นางสาว พิมพ์ทิชา รังสิมาพิธากรณ์',active:true},{id:'30',code:'030',name:'นางสาว พิมพ์พันธุ์ กล่องทอง',active:true},{id:'31',code:'031',name:'นางสาว พิมพ์วิภา เภาเสน',active:true},{id:'32',code:'032',name:'นางสาว ภัทธณดา แสงคำ',active:true},{id:'33',code:'033',name:'นาย ภัทรกฤต ใยอิ้ม',active:true},{id:'34',code:'034',name:'นางสาว ภัทรธิดา ละดาดาษ',active:true},{id:'35',code:'035',name:'นางสาว ภัทรวรินทร์ เกษมสุข',active:true},{id:'36',code:'036',name:'นางสาว ภัทราภรณ์ พิชญเวทย์วงศา',active:true},{id:'37',code:'037',name:'นาย ภูมิภัทร สว่างเวียง',active:true},{id:'38',code:'038',name:'นางสาว มัชญา สาขะยัง',active:true},{id:'39',code:'039',name:'นางสาว รัตน์สุดา เสนาชู',active:true},{id:'40',code:'040',name:'นางสาว รุ่งอรุณ เครือวัลวงษ์',active:true},{id:'41',code:'041',name:'นางสาว ลฎาภา ศรีสุนทร',active:true},{id:'42',code:'042',name:'นางสาว วราพร แสนเจริญสุข',active:true},{id:'43',code:'043',name:'นางสาว วิลาสินี ชัยชนะศรี',active:true},{id:'44',code:'044',name:'นาย ศรัณย์ อินทรีย์',active:true},{id:'45',code:'045',name:'นางสาว สิรินทรา ทัศมาลัย',active:true},{id:'46',code:'046',name:'นางสาว สุภาพร เรือนแป้น',active:true},{id:'47',code:'047',name:'นาย อชิรวิชญ์ พงษ์พรต',active:true},{id:'48',code:'048',name:'นางสาว อทิตยา ผกาผล',active:true},{id:'49',code:'049',name:'นางสาว อภิชญาน์ แก้วภักดี',active:true},{id:'50',code:'050',name:'นาย อภิชัย หมั่นประกอบ',active:true},{id:'51',code:'051',name:'นางสาว อรรัมภา เฉลิมพล',active:true},{id:'52',code:'052',name:'นางสาว อัจฉริยา ดนร่าหมาน',active:true},{id:'53',code:'053',name:'นางสาว อัญญานี อาสะหนิ',active:true},{id:'54',code:'054',name:'นางสาว อินทุอร ทองมี',active:true},{id:'55',code:'055',name:'นางสาว อุมาพร อาญาเมือง',active:true}
    ];
    const DATA_VERSION = 'rt06-v2';
    const RT06_MEMBERS = [
        {id:'1',code:'034',name:'นางสาว พัชราภา (พลอย)',active:true},{id:'2',code:'001',name:'นางสาว กนกพร (แป๋ม)',active:true},{id:'3',code:'002',name:'นาย กันติทัต (ข้าวตัง)',active:true},{id:'4',code:'003',name:'นางสาว กัลยกร (หงส์)',active:true},{id:'5',code:'004',name:'นางสาว จินตนา (น้ำ)',active:true},{id:'6',code:'005',name:'นางสาว จิรนุช (ปาล์มมี่)',active:true},{id:'7',code:'006',name:'นางสาว ชนติกานต์ (ปราย)',active:true},{id:'8',code:'007',name:'นางสาว ซุลฟา (ซุล)',active:true},{id:'9',code:'008',name:'นางสาว ณัฏฐ์นรี (ออม)',active:true},{id:'10',code:'009',name:'นางสาว ดอกรัก (ดาด้า)',active:true},{id:'11',code:'010',name:'นาย ติณณ์ถิรวิทย์ (ติน)',active:true},{id:'12',code:'011',name:'นางสาว ธนัญภรณ์ (มิ)',active:true},{id:'13',code:'012',name:'นางสาว ธิญาดา (เนย)',active:true},{id:'14',code:'013',name:'นางสาว ธิญาดา (อุ้ม)',active:true},{id:'15',code:'014',name:'นางสาว นงค์ณภัทร (ปีใหม่)',active:true},{id:'16',code:'015',name:'นางสาว นฏกร (โซดา)',active:true},{id:'17',code:'016',name:'นางสาว นภัสวรรณ์ (อ๋อมแอ๋ม)',active:true},{id:'18',code:'017',name:'นางสาว นภัสวรรณ (แพร)',active:true},{id:'19',code:'018',name:'นาย บดินทร์ (ภีมี)',active:true},{id:'20',code:'019',name:'นางสาว บุษกร (บุตร)',active:true},{id:'21',code:'020',name:'นางสาว ประภัสสร (ชามุก)',active:true},{id:'22',code:'021',name:'นางสาว ประภัสสร (สายป่าน)',active:true},{id:'23',code:'022',name:'นางสาว ปวีณ์ธิดา (ฟาง)',active:true},{id:'24',code:'023',name:'นางสาว ปิยะธิดา (ครีม)',active:true},{id:'25',code:'024',name:'นางสาว ปิยะมาศ (บิว)',active:true},{id:'26',code:'025',name:'นางสาว ปิยะมาศ (แพร)',active:true},{id:'27',code:'026',name:'นางสาว ปุญญิศา (เพลง)',active:true},{id:'28',code:'027',name:'นางสาว พนิตพิชา (เฟีย)',active:true},{id:'29',code:'029',name:'นางสาว พิมพ์ทิชา (เฝิง)',active:true},{id:'30',code:'030',name:'นางสาว พิมพ์พันธุ์ (พะพิม)',active:true},{id:'31',code:'031',name:'นางสาว พิมพ์วิภา (พิมพ์)',active:true},{id:'32',code:'032',name:'นางสาว ภัทธณดา (เนย)',active:true},{id:'33',code:'033',name:'นาย ภัทรกฤต (บี)',active:true},{id:'34',code:'034',name:'นางสาว ภัทรธิดา (แฟนต้า)',active:true},{id:'35',code:'035',name:'นางสาว ภัทรวรินทร์ (มาโปรด)',active:true},{id:'36',code:'036',name:'นางสาว ภัทราภรณ์ (อิ๋งๆ)',active:true},{id:'37',code:'037',name:'นาย ภูมิภัทร (ภูมิ)',active:true},{id:'38',code:'038',name:'นางสาว มัชญา (มายด์)',active:true},{id:'39',code:'039',name:'นางสาว รัตน์สุดา (บิว)',active:true},{id:'40',code:'040',name:'นางสาว รุ่งอรุณ (กวาง)',active:true},{id:'41',code:'041',name:'นางสาว ลฎาภา (โฟม)',active:true},{id:'42',code:'042',name:'นางสาว วราพร (นุ่น)',active:true},{id:'43',code:'043',name:'นางสาว วิลาสินี (ยาหยี)',active:true},{id:'44',code:'044',name:'นาย ศรัณย์ (โก้)',active:true},{id:'45',code:'045',name:'นางสาว สิรินทรา (ฟ้า)',active:true},{id:'46',code:'046',name:'นางสาว สุภาพร (จอย)',active:true},{id:'47',code:'047',name:'นาย อชิรวิชญ์ (อชิ)',active:true},{id:'48',code:'048',name:'นางสาว อทิตยา (เนย)',active:true},{id:'49',code:'049',name:'นางสาว อภิชญาน์ (น้ำอิง)',active:true},{id:'50',code:'050',name:'นาย อภิชัย (เทพ)',active:true},{id:'51',code:'051',name:'นางสาว อรรัมภา (เอวา)',active:true},{id:'52',code:'052',name:'นางสาว อัจฉริยา (มาลีน่า)',active:true},{id:'53',code:'053',name:'นางสาว อัญญานี (อัน)',active:true},{id:'54',code:'054',name:'นางสาว อินทุอร (อุ้ยอ้าย)',active:true},{id:'55',code:'055',name:'นางสาว อุมาพร (มุก)',active:true}
    ];

    let members = [];
    let history = [];
    let wheel = null;
    let currentWinner = null;

    function loadData() {
        try {
            const savedMembers = localStorage.getItem('lucky_wheel_members');
            const savedVersion = localStorage.getItem('lucky_wheel_data_version');
            members = savedMembers && savedVersion === DATA_VERSION ? JSON.parse(savedMembers) : JSON.parse(JSON.stringify(RT06_MEMBERS));
            localStorage.setItem('lucky_wheel_data_version', DATA_VERSION);

            const savedHistory = localStorage.getItem('lucky_wheel_history');
            history = savedHistory ? JSON.parse(savedHistory) : [];

            const savedTopic = localStorage.getItem('lucky_wheel_topic');
            if (savedTopic) {
                document.getElementById('topicInput').value = savedTopic;
            }

            const autoRemove = localStorage.getItem('lucky_wheel_autoremove');
            if (autoRemove !== null) {
                document.getElementById('autoRemoveCheck').checked = (autoRemove === 'true');
            }
        } catch (e) {
            console.error('Failed to load data from localStorage', e);
            members = DEFAULT_MEMBERS;
        }
    }

    function saveData() {
        try {
            localStorage.setItem('lucky_wheel_members', JSON.stringify(members));
            localStorage.setItem('lucky_wheel_history', JSON.stringify(history));
            localStorage.setItem('lucky_wheel_topic', document.getElementById('topicInput').value);
            localStorage.setItem('lucky_wheel_autoremove', document.getElementById('autoRemoveCheck').checked);
            localStorage.setItem('lucky_wheel_data_version', DATA_VERSION);
        } catch (e) {
            console.error('Failed to save data', e);
        }
    }

    // Confetti System
    const confettiCanvas = document.getElementById('confettiCanvas');
    const confettiCtx = confettiCanvas.getContext('2d');
    let confettiParticles = [];
    let confettiAnimId = null;

    function resizeConfetti() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeConfetti);
    resizeConfetti();

    function triggerConfetti() {
        confettiParticles = [];
        const colors = ['#FF2E93', '#FFD600', '#00E5FF', '#00E676', '#7C4DFF', '#ffffff'];
        for (let i = 0; i < 180; i++) {
            confettiParticles.push({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                w: Math.random() * 12 + 6,
                h: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 22,
                vy: (Math.random() - 0.7) * 24,
                gravity: 0.4,
                rotation: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 10,
                opacity: 1
            });
        }

        if (confettiAnimId) cancelAnimationFrame(confettiAnimId);

        function renderConfetti() {
            confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            let active = false;

            for (let p of confettiParticles) {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += p.gravity;
                p.vx *= 0.98;
                p.rotation += p.rotSpeed;
                p.opacity -= 0.005;

                if (p.opacity > 0 && p.y < confettiCanvas.height) {
                    active = true;
                    confettiCtx.save();
                    confettiCtx.translate(p.x, p.y);
                    confettiCtx.rotate((p.rotation * Math.PI) / 180);
                    confettiCtx.fillStyle = p.color;
                    confettiCtx.globalAlpha = Math.max(0, p.opacity);
                    confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                    confettiCtx.restore();
                }
            }

            if (active) {
                confettiAnimId = requestAnimationFrame(renderConfetti);
            } else {
                confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            }
        }
        renderConfetti();
    }

    // UI Renderers
    function renderMemberList() {
        const listEl = document.getElementById('memberList');
        const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
        listEl.innerHTML = '';

        const filtered = members.filter(m => {
            if (!searchTerm) return true;
            return (m.name && m.name.toLowerCase().includes(searchTerm)) ||
                   (m.code && m.code.toLowerCase().includes(searchTerm));
        });

        const activeCount = members.filter(m => m.active !== false).length;
        document.getElementById('memberCountBadge').textContent = `${activeCount} / ${members.length} คน`;

        if (filtered.length === 0) {
            listEl.innerHTML = '<div style="text-align: center; padding: 28px; color: #64748b;">ไม่พบรายชื่อ</div>';
            return;
        }

        filtered.forEach(m => {
            const displayName = splitMemberName(m);
            const card = document.createElement('div');
            card.className = `member-card ${m.active === false ? 'excluded' : ''}`;
            card.innerHTML = `
                <div class="member-info">
                    <div class="member-details">
                        <span class="member-code-badge">${escapeHtml(m.code || '—')}</span>
                        <span class="member-name member-real-name">${escapeHtml(displayName.name)}</span>
                        <span class="member-nickname">${escapeHtml(displayName.nickname || '—')}</span>
                    </div>
                </div>
                <div class="member-actions">
                    <button class="btn-card-action toggle-active ${m.active !== false ? 'active' : 'inactive'}" title="${m.active !== false ? 'ตัดชื่อออกชั่วคราว' : 'เปิดใช้งานในวงล้อ'}">
                        ${m.active !== false ? '👁️' : '🚫'}
                    </button>
                    <button class="btn-card-action edit" title="แก้ไข">✏️</button>
                    <button class="btn-card-action delete" title="ลบชื่อ">🗑️</button>
                </div>
            `;

            card.querySelector('.toggle-active').addEventListener('click', () => {
                if (window.soundEngine) window.soundEngine.playClick(450);
                m.active = (m.active === false);
                saveData();
                renderMemberList();
                updateWheel();
            });

            card.querySelector('.edit').addEventListener('click', () => {
                if (window.soundEngine) window.soundEngine.playClick(550);
                const newCode = prompt('แก้ไขรหัสประจำตัว (เช่น 023):', m.code || '');
                if (newCode === null) return;
                const newName = prompt('แก้ไขชื่อ:', m.name || '');
                if (newName === null) return;

                if (newName.trim() === '') {
                    alert('ชื่อไม่สามารถเว้นว่างได้');
                    return;
                }
                m.code = newCode.trim();
                m.name = newName.trim();
                saveData();
                renderMemberList();
                updateWheel();
            });

            card.querySelector('.delete').addEventListener('click', () => {
                if (window.soundEngine) window.soundEngine.playClick(300);
                if (confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบ "${m.name}"?`)) {
                    members = members.filter(item => item.id !== m.id);
                    saveData();
                    renderMemberList();
                    updateWheel();
                }
            });

            listEl.appendChild(card);
        });
    }

    function renderHistoryList() {
        const historyEl = document.getElementById('historyList');
        historyEl.innerHTML = '';
        if (history.length === 0) {
            historyEl.innerHTML = '<div style="text-align: center; padding: 28px; color: #64748b;">ยังไม่มีประวัติการสุ่ม</div>';
            return;
        }

        history.slice().reverse().forEach(h => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `
                <div>
                    <div class="history-title">${escapeHtml(h.topic || 'สุ่มผู้โชคดี')}</div>
                    <div class="history-winner">
                        ${h.code ? `[${escapeHtml(h.code)}] ` : ''}${escapeHtml(h.name)}
                    </div>
                </div>
                <div class="history-time">${escapeHtml(h.time)}</div>
            `;
            historyEl.appendChild(item);
        });
    }

    function renderDataSetPreview() {
        const preview = document.getElementById('dataSetPreview');
        if (!preview) return;
        const active = members.filter(m => m.active !== false);
        preview.textContent = active.length ? `ตัวอย่าง: ${active.slice(0, 5).map(m => m.name).join(' • ')}${active.length > 5 ? ` • และอีก ${active.length - 5} คน` : ''}` : 'ชุดนี้ยังไม่มีรายชื่อที่เปิดใช้งาน';
    }

    function updateWheel() {
        if (wheel) {
            wheel.setItems(members);
            const activeItems = members.filter(m => m.active !== false);
            const spinBtn = document.getElementById('spinBtn');
            spinBtn.disabled = activeItems.length === 0 || wheel.isSpinning;
        }
    }

    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }

    function splitMemberName(member) {
        const match = (member.name || '').match(/^(.*?)(?:\s*\((.*)\))?$/);
        return { name: match && match[1] ? match[1].trim() : (member.name || ''), nickname: match && match[2] ? match[2].trim() : '' };
    }

    function handleWinnerSelected(winner) {
        currentWinner = winner;
        const stage = document.querySelector('.wheel-wrapper');
        document.querySelector('.wheel-stage-container').classList.remove('is-spinning');
        document.body.classList.remove('screen-shake', 'winner-flash');
        void document.body.offsetWidth;
        document.body.classList.add('screen-shake', 'winner-flash');
        setTimeout(() => document.body.classList.remove('screen-shake', 'winner-flash'), 800);
        const spotlight = document.getElementById('suspenseSpotlight');
        stage.classList.remove('suspense');
        spotlight.classList.remove('active');

        if (window.soundEngine) window.soundEngine.playFanfare();
        triggerConfetti();

        const topic = document.getElementById('topicInput').value.trim() || 'สุ่มผู้โชคดี';
        const now = new Date();
        const timeStr = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        history.push({
            topic: topic,
            code: winner.code || '',
            name: winner.name,
            time: timeStr
        });
        saveData();
        renderHistoryList();

        const modal = document.getElementById('winnerModal');
        document.getElementById('modalTopic').textContent = topic;
        const codeDisplay = document.getElementById('modalCode');
        if (winner.code) {
            codeDisplay.textContent = 'รหัส: ' + winner.code;
            codeDisplay.style.display = 'inline-block';
        } else {
            codeDisplay.style.display = 'none';
        }
        const winnerName = splitMemberName(winner);
        document.getElementById('modalWinnerName').textContent = winnerName.name;
        document.getElementById('modalWinnerNickname').textContent = winnerName.nickname ? `ชื่อเล่น: ${winnerName.nickname}` : '';
        modal.classList.add('active');

        const autoRemove = document.getElementById('autoRemoveCheck').checked;
        if (autoRemove) {
            removeWinnerFromList(false);
        }

        document.getElementById('spinBtn').disabled = false;
    }

    function removeWinnerFromList(closeModal = true) {
        if (!currentWinner) return;
        members = members.filter(m => m.id !== currentWinner.id);
        saveData();
        renderMemberList();
        updateWheel();
        if (closeModal) {
            document.getElementById('winnerModal').classList.remove('active');
        }
    }

    function parseImportText(text) {
        const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
        const imported = [];

        lines.forEach(line => {
            let parts = line.includes('\t') ? line.split('\t') : line.split(',');
            parts = parts.map(p => p.trim().replace(/^["']|["']$/g, ''));

            if (parts.length >= 2) {
                imported.push({
                    id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                    code: parts[0],
                    name: parts[1],
                    active: true
                });
            } else if (parts.length === 1 && parts[0]) {
                imported.push({
                    id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                    code: '',
                    name: parts[0],
                    active: true
                });
            }
        });

        return imported;
    }

    document.addEventListener('DOMContentLoaded', () => {
        loadData();

        wheel = new window.LuckyWheel('wheelCanvas', 
            (winner) => handleWinnerSelected(winner),
            (speedFactor) => {
                if (window.soundEngine) {
                    window.soundEngine.playTick(1 + (1 - speedFactor) * 0.4);
                }
            }
        );

        updateWheel();
        renderMemberList();
        renderHistoryList();
        renderDataSetPreview();

        document.getElementById('loadDataSetBtn').addEventListener('click', () => {
            if (window.soundEngine) window.soundEngine.playClick(700);
            members = JSON.parse(JSON.stringify(RT06_MEMBERS));
            saveData();
            renderMemberList();
            renderDataSetPreview();
            updateWheel();
            document.querySelector('[data-tab="tabMembers"]').click();
        });

        let isMuted = false;
        const muteBtn = document.getElementById('muteToggleBtn');
        muteBtn.addEventListener('click', () => {
            isMuted = !isMuted;
            if (window.soundEngine) {
                window.soundEngine.setMuted(isMuted);
                window.soundEngine.playClick(isMuted ? 300 : 700);
            }
            muteBtn.innerHTML = isMuted ? '🔇 <span>เปิดเสียง</span>' : '🔊 <span>เสียงเอฟเฟกต์</span>';
        });

        const addBtn = document.getElementById('addMemberBtn');
        const codeInput = document.getElementById('newMemberCode');
        const nameInput = document.getElementById('newMemberName');

        function addMember() {
            const name = nameInput.value.trim();
            const code = codeInput.value.trim();
            if (!name) {
                alert('กรุณากรอกชื่อ');
                nameInput.focus();
                return;
            }

            if (window.soundEngine) window.soundEngine.playClick(650);

            members.push({
                id: Date.now().toString() + Math.random().toString(36).substr(2, 4),
                code: code,
                name: name,
                active: true
            });

            nameInput.value = '';
            codeInput.value = '';
            codeInput.focus();

            saveData();
            renderMemberList();
            renderDataSetPreview();
            updateWheel();
        }

        addBtn.addEventListener('click', addMember);
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addMember();
        });
        codeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') nameInput.focus();
        });

        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', () => {
            renderMemberList();
        });

        const topicInput = document.getElementById('topicInput');
        topicInput.addEventListener('input', () => {
            saveData();
        });

        document.getElementById('autoRemoveCheck').addEventListener('change', () => {
            saveData();
        });

        const spinBtn = document.getElementById('spinBtn');
        spinBtn.addEventListener('click', () => {
            const activeMembers = members.filter(m => m.active !== false);
            if (activeMembers.length === 0) {
                alert('ไม่มีรายชื่อที่เปิดใช้งาน กรุณาเปิดหรือเพิ่มรายชื่อก่อนสุ่ม');
                return;
            }

            if (window.soundEngine) {
                window.soundEngine.playClick(800);
                window.soundEngine.playRiser();
            }

            document.querySelector('.wheel-wrapper').classList.add('suspense');
            document.querySelector('.wheel-stage-container').classList.add('is-spinning');
            document.getElementById('suspenseSpotlight').classList.add('active');
            spinBtn.disabled = true;

            wheel.spin();
        });

        document.getElementById('closeModalBtn').addEventListener('click', () => {
            if (window.soundEngine) window.soundEngine.playClick();
            document.getElementById('winnerModal').classList.remove('active');
        });

        document.getElementById('removeWinnerBtn').addEventListener('click', () => {
            if (window.soundEngine) window.soundEngine.playClick();
            removeWinnerFromList(true);
        });

        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                if (window.soundEngine) window.soundEngine.playClick();
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const targetPane = tab.getAttribute('data-tab');
                document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
                document.getElementById(targetPane).classList.add('active');
            });
        });

        document.getElementById('enableAllBtn').addEventListener('click', () => {
            if (window.soundEngine) window.soundEngine.playClick();
            members.forEach(m => m.active = true);
            saveData();
            renderMemberList();
            updateWheel();
        });

        document.getElementById('clearAllBtn').addEventListener('click', () => {
            if (window.soundEngine) window.soundEngine.playClick();
            if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายชื่อทั้งหมด?')) {
                members = [];
                saveData();
                renderMemberList();
                updateWheel();
            }
        });

        document.getElementById('resetPresetBtn').addEventListener('click', () => {
            if (window.soundEngine) window.soundEngine.playClick();
            members = JSON.parse(JSON.stringify(RT06_MEMBERS));
            saveData();
            renderMemberList();
            updateWheel();
        });

        document.getElementById('clearHistoryBtn').addEventListener('click', () => {
            if (window.soundEngine) window.soundEngine.playClick();
            if (confirm('ต้องการล้างประวัติการสุ่มทั้งหมดหรือไม่?')) {
                history = [];
                saveData();
                renderHistoryList();
            }
        });

        document.getElementById('processPasteBtn').addEventListener('click', () => {
            if (window.soundEngine) window.soundEngine.playClick();
            const text = document.getElementById('pasteTextarea').value;
            const parsed = parseImportText(text);
            if (parsed.length === 0) {
                alert('ไม่พบข้อมูล กรุณาวางข้อความที่มีรายชื่อ');
                return;
            }

            const append = confirm(`พบ ${parsed.length} รายการ\nต้องการ 'เพิ่มต่อท้าย' (OK) หรือ 'แทนที่ทั้งหมด' (Cancel)?`);
            if (append) {
                members = members.concat(parsed);
            } else {
                members = parsed;
            }

            saveData();
            renderMemberList();
            updateWheel();
            document.getElementById('pasteTextarea').value = '';
            alert(`นำเข้าเรียบร้อยแล้ว ${parsed.length} คน!`);

            document.querySelector('[data-tab="tabMembers"]').click();
        });

        document.getElementById('fetchSheetBtn').addEventListener('click', async () => {
            const urlInput = document.getElementById('sheetUrlInput').value.trim();
            if (!urlInput) {
                alert('กรุณาวางลิงก์ Google Sheets');
                return;
            }

            let csvUrl = urlInput;
            const match = urlInput.match(/\/d\/([a-zA-Z0-9-_]+)/);
            if (match && match[1]) {
                const sheetId = match[1];
                csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
            }

            try {
                if (window.soundEngine) window.soundEngine.playClick();
                const btn = document.getElementById('fetchSheetBtn');
                btn.textContent = 'กำลังโหลด...';
                btn.disabled = true;

                const res = await fetch(csvUrl);
                if (!res.ok) throw new Error('Network error: ไม่สามารถเข้าถึง Sheet ได้');
                const csvData = await res.text();
                const parsed = parseImportText(csvData);

                if (parsed.length === 0) {
                    alert('ไม่พบข้อมูลใน Google Sheet หรือยังไม่ได้แชร์เป็นสาธารณะ (Anyone with the link can view)');
                } else {
                    const append = confirm(`โหลดข้อมูลสำเร็จ ${parsed.length} รายการ!\nต้องการ 'เพิ่มต่อท้าย' (OK) หรือ 'แทนที่ทั้งหมด' (Cancel)?`);
                    if (append) {
                        members = members.concat(parsed);
                    } else {
                        members = parsed;
                    }
                    saveData();
                    renderMemberList();
                    updateWheel();
                    document.querySelector('[data-tab="tabMembers"]').click();
                }
            } catch (err) {
                alert('เกิดข้อผิดพลาดในการดึงข้อมูลจาก Google Sheets:\n' + err.message + '\n\nคำแนะนำ: กรุณาตรวจสอบว่า Google Sheet ได้ตั้งค่าแชร์เป็น "ทุกคนที่มีลิงก์ (Anyone with the link)" หรือใช้วิธี Copy & Paste ข้อความในแท็บด้านล่างได้เลยครับ');
            } finally {
                const btn = document.getElementById('fetchSheetBtn');
                btn.textContent = '📥 ดึงข้อมูลจาก Google Sheets';
                btn.disabled = false;
            }
        });
    });
})();
