// timer-worker.js
let timerId = null;
let timeRemaining = 0;

self.addEventListener('message', (e) => {
    const data = e.data;

    if (data.command === 'start') {
        clearInterval(timerId);
        timeRemaining = data.duration;

        timerId = setInterval(() => {
            timeRemaining--;
            // Kirim sisa detik ke halaman utama setiap detik berjalan
            self.postMessage({ status: 'tick', timeRemaining: timeRemaining });

            if (timeRemaining <= 0) {
                clearInterval(timerId);
                self.postMessage({ status: 'completed' });
            }
        }, 1000);
    } 
    
    else if (data.command === 'stop') {
        clearInterval(timerId);
    }
});
