'use strict'

function $(s, all) {
    return all ? document.querySelectorAll(s) : document.querySelector(s)
}

document.addEventListener('DOMContentLoaded', function () {
    const player = $('.audio-player')
    if (!player) return

    const audio = player.querySelector('audio')
    const playBtn = $('.audio-play-btn')
    const progress = $('.audio-progress')
    const progressContainer = $('.audio-progress-container')
    const timeCurrent = $('.audio-time-current')
    const timeDuration = $('.audio-time-duration')

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds) || !isFinite(seconds)) return '0:00'
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const storageKey = 'audio-pos-' + window.location.pathname
    let positionRestored = false
    let lastSavedSecond = -1

    const savePosition = () => {
        if (audio.currentTime > 0) {
            console.log('Audio save:', audio.currentTime)
            localStorage.setItem(storageKey, audio.currentTime)
        }
    }

    const handleMetadata = () => {
        console.log('Audio metadata:', {
            duration: audio.duration,
            readyState: audio.readyState,
            positionRestored,
        })
        if (!audio.duration || isNaN(audio.duration) || !isFinite(audio.duration)) return
        timeDuration.textContent = formatTime(audio.duration)

        if (!positionRestored) {
            const savedPos = parseFloat(localStorage.getItem(storageKey))
            console.log('Audio restore check, savedPos:', savedPos)
            if (savedPos > 0) {
                positionRestored = true
                audio.currentTime = savedPos
                console.log('Audio pre-positioned to:', savedPos, '| actual currentTime after:', audio.currentTime)
            }
        }
    }

    if (audio.readyState >= 1) {
        handleMetadata()
    }

    audio.addEventListener('loadedmetadata', handleMetadata)
    audio.addEventListener('canplay', handleMetadata)

    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            console.log('Audio play clicked, currentTime at click:', audio.currentTime)
            audio.play()
            playBtn.textContent = '⏸'
        } else {
            audio.pause()
            playBtn.textContent = '▶'
        }
    })

    audio.addEventListener('timeupdate', () => {
        if (!audio.duration || isNaN(audio.duration)) return
        const percent = (audio.currentTime / audio.duration) * 100
        progress.style.width = percent + '%'
        timeCurrent.textContent = formatTime(audio.currentTime)

        const t = Math.floor(audio.currentTime)
        if (t > 0 && t % 5 === 0 && t !== lastSavedSecond && !audio.paused) {
            lastSavedSecond = t
            savePosition()
        }
    })

    audio.addEventListener('pause', savePosition)

    audio.addEventListener('ended', () => {
        playBtn.textContent = '▶'
        progress.style.width = '0%'
        timeCurrent.textContent = '0:00'
        localStorage.removeItem(storageKey)
    })

    progressContainer.addEventListener('click', (e) => {
        if (!audio.duration) return
        const rect = progressContainer.getBoundingClientRect()
        const percent = (e.clientX - rect.left) / rect.width
        audio.currentTime = percent * audio.duration
    })
})
