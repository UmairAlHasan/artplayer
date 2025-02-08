const player = new Artplayer({
    container: '.artplayer-app',
    url: episodes[0].url,
    poster: episodes[0].poster,
    lock: true,
    volume: 1.0,
    isLive: false,
    muted: false,
    autoplay: false,
    pip: false,
    autoSize: true,
    autoMini: true,
    screenshot: false,
    setting: true,
    loop: true,
    flip: false,
    playbackRate: true,
    aspectRatio: true,
    fullscreen: true,
    fullscreenWeb: false,
    subtitleOffset: false,
    miniProgressBar: true,
    mutex: true,
    backdrop: true,
    playsInline: true,
    autoPlayback: true,
    airplay: true,
    autoOrientation: true,
    theme: '#129444',
    lang: navigator.language.toLowerCase(),
    moreVideoAttr: {},
    subtitle: {
        url: episodes[0].sub,
        style: { color: '#fff', fontSize: '12px' }
    },
    settings: [
        {
            html: 'Subtitle',
            tooltip: 'English',
            icon: '<img width="20" height="20" src="icons/subtitle.svg">',
            selector: [
                {
                    html: 'Display',
                    tooltip: 'Show',
                    switch: true,
                    onSwitch: function (item) {
                        item.tooltip = item.switch ? 'Hide' : 'Show';
                        player.subtitle.show = !item.switch;
                        return !item.switch;
                    },
                },
                {
                    html: 'English',
                    url: episodes[0].sub,
                    default: true,
                    click: function() {
                        player.subtitle.url = episodes[0].sub;
                    }
                }
            ],
            onSelect: function(item) {
                player.subtitle.url = item.url;
                return item.html;
            },
        },
        {
            html: 'Sub Size',
            tooltip: 'Medium',
            icon: '<img width="16" height="16" src="icons/text.svg">',
            selector: [
                { html: 'Small', value: '8px' },
                { html: 'Medium', value: '12px', default: true },
                { html: 'Large', value: '16px' }
            ],
            onSelect: function (item) {
                player.subtitle.style({ fontSize: item.value });
                return item.html;
            },
        },
{
                    html: 'Auto Skip',
                    tooltip: localStorage.getItem('autoSkipEnabled') === 'true' ? '' : '',
                    icon: '<img width="16" height="16" src="icons/skip.svg">',
                    switch: true,
                    default: true,
                    onSwitch: function(item) {
                        const isEnabled = !settings.autoSkipIntro;
                        settings.autoSkipIntro = isEnabled;
                        settings.autoSkipOutro = isEnabled;
                        item.tooltip = isEnabled ? '' : '';
                        localStorage.setItem('autoSkipEnabled', isEnabled);
                        return isEnabled;
                    },
                }    
    ],
    contextmenu: [
        {
            html: 'UrduCloud',
            click: function (contextmenu) {
                window.open('https://');
                console.info('You clicked on the custom menu');
                contextmenu.show = true;
            },
        },
    ],
    layers: [
        {
            html: '<img width="24" height="24" src="icons/logo.svg">',
            click: function () {
                window.open('/');
                console.info('You clicked on the custom layer');
            },
            style: {
                position: 'absolute',
                top: '20px',
                left: '20px',
                opacity: '.9',
            },
        },
    ],
    plugins: [
        artplayerPluginAds({
            html: '<img src="src/demo1.jpg">',
            video: 'src/demo1.mp4',
            url: '/',
            playDuration: 0,
            totalDuration: 60,
            i18n: {
                close: 'Skip',
                countdown: '%s',
                detail: 'Click here',
                canBeClosed: 'Skip ad in %s',
            },
        }),
        artplayerPluginChapter({
            chapters: [
                { start: 40, end: 180, title: 'Intro' },
                { start: 1337, end: 1400, title: 'Outro' },
            ]
        }),
        artplayerPluginChromecast({
          sdk: 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js',
    getSource: (art) => {
        return {
            type: 'video/mp4',
            src: art.url,
        };
    },
        }),
    ],
    icons: {
        loading: '<img width="80" height="80" src="icons/loading.svg">',
        state: '<img width="50" height="50" src="icons/state.svg">',
        indicator: '<img width="16" height="16" src="icons/indicator.svg">',
        pip: `<img width="20" height="20" src="icons/pip.svg">`,
        play: `<img width="20" height="20" src="icons/play.svg">`,
        pause: `<img width="20" height="20" src="icons/pause.svg">`,
        playbackRate: `<img width="16" height="16" src="icons/playback.png">`,
        aspectRatio: `<img width="20" height="20" src="icons/quality.png">`,
        config: `<img src="icons/config.svg">`,
        fullscreenOn: '<img width="20" height="20" src="icons/fullscreen-on.svg">',
        fullscreenOff: '<img width="20" height="20" src="icons/fullscreen-off.svg">',
        volume: '<img src="icons/volume.svg">',
        volumeClose: '<img src="icons/vl-close.svg">',
        screenshot: `<img width="20" height="20" src="icons/screenshot.svg">`,
        lock: `<img width="16" height="16" src="icons/lock1.svg">`,
        unlock: `<img width="16" height="16" src="icons/unlock1.svg">`,
        setting: '<img width="20" height="20" src="icons/setting1.svg">',
    },
    controls: [
        {
            position: 'right',
            html: '<img width="24" height="24" src="icons/rewind.png">',
            tooltip: 'Rewind 10s',
            click: function () {
                player.seek = player.currentTime - 10;
            },
        },
        {
            position: 'right',
            html: '<img width="24" height="24" src="icons/forward.png">',
            tooltip: 'Forward 10s',
            click: function () {
                player.seek = player.currentTime + 10;
            },
        },
    ],
});

const skipIntroLayer = player.layers.add({
            html: '<img width="20" height="20" src="icons/skip-fast.svg"> Skip Intro',
            style: {
                position: 'absolute',
                border: '1px solid #fff',
                top: '5px', 
                right: '5px', 
                background: '#000', 
                color: '#fff', 
                padding: '4px 8px', 
                borderRadius: '3px', 
                cursor: 'pointer',
                display: 'none',
                fontSize: '1rem' // Initially hidden
            },
            click: function() {
                player.currentTime = 180; // Skip to the end of the intro
            }
        });

        const skipOutroLayer = player.layers.add({
            html: '<img width="20" height="20" src="icons/skip-fast.svg"> Skip Outro',
            style: {
                position: 'absolute',
                border: '1px solid #fff',
                top: '5px', 
                right: '5px', 
                background: '#000', 
                color: '#fff', 
                padding: '4px 8px', 
                borderRadius: '3px', 
                cursor: 'pointer',
                display: 'none',
                fontSize: '1rem' 
            },
            click: function() {
                player.currentTime = 1400; 
            }
        }); 
player.on('video:timeupdate', () => {
            const currentTime = player.currentTime;
            if (currentTime >= 40 && currentTime < 180) {
                skipIntroLayer.style.display = 'block';
                skipOutroLayer.style.display = 'none';
                if (settings.autoSkipIntro) player.currentTime = 180;
            } else if (currentTime >= 1337 && currentTime < 1400) {
                skipIntroLayer.style.display = 'none';
                skipOutroLayer.style.display = 'block';
                if (settings.autoSkipOutro) player.currentTime = 1400;
            } else {
                skipIntroLayer.style.display = 'none';
                skipOutroLayer.style.display = 'none';
            }
        });

        player.on('dblclick', (event) => {
            const clickX = event.clientX;
            const halfWidth = player.template.$player.getBoundingClientRect().width / 2;
            player.currentTime += (clickX > halfWidth) ? 10 : -10;
        });

        player.on('ready', () => {
            const autoSkipEnabled = localStorage.getItem('autoSkipEnabled');
            settings.autoSkipIntro = settings.autoSkipOutro = autoSkipEnabled === 'true';
        });

        player.on('artplayerPluginAds:click', (ads) => console.info('Ad clicked', ads));
        player.on('artplayerPluginAds:skip', (ads) => console.info('Ad skipped', ads));
    
document.querySelector('.artplayer-app').addEventListener('contextmenu', function (event) {
    event.preventDefault();
}, false); 

// Function to create the playlist
function loadPlaylist() {
    const playlist = document.getElementById("playlist");
    playlist.innerHTML = "";

    episodes.forEach((episodes, index) => {
        const ep = document.createElement("div");
        ep.classList.add("episodes");
        if (index === 0) ep.classList.add("active"); // Highlight first episodes by default

        ep.innerHTML = `
            <img src="${episodes.poster}" alt="episodes ${index + 1}">
            <span class="ep-number">EP ${index + 1}</span>
            <div class="episodes-info">
                <div class="episodes-title">
                    ${episodes.title}
                    <span class="episodes-icons">
                        <i class="fa-solid fa-microphone"></i>
                        <i class="fa-solid fa-closed-captioning"></i>
                    </span>
                </div>
                <div class="episodes-desc">${episodes.description}</div>
                <div class="episodes-date">${episodes.date}</div>
            </div>
        `;

        ep.addEventListener("click", () => {
            document.querySelectorAll(".episodes").forEach(e => e.classList.remove("active"));
            ep.classList.add("active");

            player.url = episodes.url;
            player.poster = episodes.poster;
            player.subtitle = episodes.sub;
        });

        playlist.appendChild(ep);
    });
}

// Load the playlist on page load
loadPlaylist();

player.on('ready', () => {
    console.info('Artplayer is ready');
    player.notice.show = 'Thanks for waiting';
});