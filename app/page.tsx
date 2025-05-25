'use client'

import { useEffect, useState, useRef } from 'react'
import { FaInstagram, FaTiktok, FaYoutube, FaEnvelope, FaReact, FaNodeJs, FaPython, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaPhp, FaDatabase, FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa'
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql, SiDocker, SiMysql } from 'react-icons/si'
import { motion } from 'framer-motion'
import Image from 'next/image'

const technologies = [
  { name: 'HTML5', icon: <FaHtml5 className="text-orange-500 text-5xl" /> },
  { name: 'CSS3', icon: <FaCss3Alt className="text-blue-500 text-5xl" /> },
  { name: 'React', icon: <FaReact className="text-cyan-400 text-5xl" /> },
  { name: 'TypeScript', icon: <SiTypescript className="text-blue-400 text-5xl" /> },
  { name: 'JavaScript', icon: <FaJs className="text-yellow-300 text-5xl" /> },
  { name: 'Node.js', icon: <FaNodeJs className="text-green-400 text-5xl" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-300 text-5xl" /> },
  { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-400 text-5xl" /> },
  { name: 'MySQL', icon: <SiMysql className="text-blue-300 text-5xl" /> },
  { name: 'Python', icon: <FaPython className="text-yellow-400 text-5xl" /> },
  { name: 'PHP', icon: <FaPhp className="text-indigo-300 text-5xl" /> },
  { name: 'SQL', icon: <FaDatabase className="text-sky-400 text-5xl" /> },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: () => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0, ease: 'easeOut' } }),
}
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)

  const src = '/lovetheme.mp3'
  const cover = '/cover.jpg'
  const title = 'The Godfather - Love Theme'
  const artist = 'henoxdev'

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.muted = muted
    }
  }, [volume, muted])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setPlaying(!playing)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime)
  }
  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration)
  }
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value)
      setCurrentTime(Number(e.target.value))
    }
  }
  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value))
  }
  const toggleMute = () => {
    setMuted(!muted)
  }

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60)
    const s = Math.floor(t % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex items-center gap-4 bg-gradient-to-r from-black via-[#2d0036] to-[#7c3aed] border border-violet-900 rounded-2xl px-4 py-3 shadow-lg mt-4 mb-8 backdrop-blur-md">
      <Image src={cover} alt="Kapak" width={56} height={56} className="rounded-lg object-cover shadow-md border border-violet-800" />
      <div className="flex-1 min-w-0">
        <div className="flex flex-col">
          <span className="font-semibold text-white truncate">{title}</span>
          <span className="text-xs text-violet-200 truncate">{artist}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <button onClick={togglePlay} className="text-violet-400 text-xl hover:text-violet-200 transition">
            {playing ? <FaPause /> : <FaPlay />}
          </button>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 accent-violet-500 h-1 mx-2"
          />
          <span className="text-xs text-violet-200 w-14 text-right font-mono">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 min-w-[80px]">
        <div className="flex items-center gap-2 w-full">
          <button onClick={toggleMute} className="text-violet-400 text-lg hover:text-violet-200 transition">
            {muted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolume}
            className="w-24 h-2 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 accent-violet-400 transition-all duration-200 outline-none focus:ring-2 focus:ring-violet-400 hover:scale-105"
            style={{ background: `linear-gradient(90deg, #a78bfa ${volume*100}%, #27272a ${volume*100}%)` }}
          />
        </div>
      </div>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setPlaying(false)}
      />
    </div>
  )
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <>
      <div className="min-h-screen w-full text-white overflow-x-hidden bg-black flex flex-col">
        <section className="min-h-[90vh] flex flex-col items-center justify-center px-4 pt-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.7 }}
            variants={fadeInUp}
            className="flex flex-col items-center"
          >
            <Image
              src="/x.png"
              alt="Profil Fotoğrafı"
              width={144}
              height={144}
              className="rounded-full border-4 border-violet-700 shadow-lg mb-6 object-cover"
            />
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight text-center drop-shadow-lg leading-tight">
              @henoxdev
            </h1>
            <p className="text-xl md:text-2xl text-violet-200 mb-8 text-center font-mono">
              dev
            </p>
            <div className="flex gap-6 mb-4">
              <a href="#" className="btn btn-circle btn-outline text-2xl text-violet-300 border-violet-700 hover:bg-violet-800 hover:text-white" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" className="btn btn-circle btn-outline text-2xl text-violet-300 border-violet-700 hover:bg-violet-800 hover:text-white" aria-label="Tiktok"><FaTiktok /></a>
              <a href="#" className="btn btn-circle btn-outline text-2xl text-violet-300 border-violet-700 hover:bg-violet-800 hover:text-white" aria-label="Youtube"><FaYoutube /></a>
              <a href="mailto:x@gmail.com" className="btn btn-circle btn-outline text-2xl text-violet-300 border-violet-700 hover:bg-violet-800 hover:text-white" aria-label="Mail"><FaEnvelope /></a>
            </div>
            <AudioPlayer />
          </motion.div>
        </section>

        <section className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeIn}
            className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-violet-300 mb-8 text-center font-mono">Hakkımda</h2>
            <p className="text-base md:text-xl text-violet-100 text-center leading-relaxed font-mono max-w-3xl">
            Merhaba, ben Henox. 5 yılı aşkın süredir full-stack yazılım geliştiricisi olarak web siteleri ve web uygulamaları üzerinde çalışıyorum. Teknik bilgi ve deneyimlerimi sosyal medya içerikleriyle paylaşarak daha geniş bir kitleye ulaşıyorum.<br /><br />
Web geliştirme alanında uçtan uca çözümler sunuyorum. Frontend ve backend geliştirme, veritabanı yönetimi ve optimizasyon gibi farklı disiplinlerde projeler gerçekleştiriyorum. HTML, CSS, JavaScript, React, TypeScript, Node.js, PHP ve SQL gibi teknolojilerle performanslı ve sürdürülebilir uygulamalar tasarlıyor ve geliştiriyorum.<br /><br />
Modern web teknolojilerini etkin şekilde kullanarak, kullanıcı deneyimi odaklı, güvenilir ve ölçeklenebilir çözümler oluşturuyorum.
            </p>
          </motion.div>
        </section>

        <section className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12">
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaHtml5 className="text-4xl text-orange-500 mb-4" />, title: 'Frontend Geliştirme',
                desc: 'HTML5, CSS3, React, Next.js ve Tailwind CSS ile modern, hızlı ve erişilebilir arayüzler.'
              },
              {
                icon: <FaNodeJs className="text-4xl text-green-400 mb-4" />, title: 'Backend Geliştirme',
                desc: 'Node.js, Express, REST API, WebSocket ve güvenli, ölçeklenebilir sunucu çözümleri.'
              },
              {
                icon: <FaPhp className="text-4xl text-indigo-300 mb-4" />, title: 'PHP & SQL',
                desc: 'PHP, MySQL, PostgreSQL ile dinamik ve güvenli backend çözümleri.'
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={i}
                variants={fadeInUp}
                whileHover={{ scale: 1.08, rotate: i === 1 ? 2 : -2 }}
                className="bg-black/30 rounded-xl p-8 border border-violet-800 flex flex-col items-center shadow-lg transition-all duration-300 backdrop-blur-md"
              >
                {item.icon}
                <h3 className="font-semibold text-xl text-white mb-2">{item.title}</h3>
                <p className="text-violet-100 text-base text-center">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="w-full max-w-5xl bg-black/30 rounded-2xl shadow-2xl p-10 border border-violet-900 backdrop-blur-md flex flex-col items-center"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-violet-300 mb-10 text-center font-mono">Kullandığım Teknolojiler</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {technologies.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  whileHover={{ scale: 1.18, rotate: 6 }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeInUp}
                  className="flex flex-col items-center group transition-all duration-300"
                >
                  <div className="transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12 mb-2">
                    {tech.icon}
                  </div>
                  <span className="text-xs text-violet-200 font-mono tracking-wide mt-1 opacity-80">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <div className="w-full flex flex-col items-center justify-center py-10 px-4 bg-black">
          <div className="max-w-xl w-full rounded-2xl shadow-2xl border border-violet-900 bg-black/80 backdrop-blur-md flex flex-col items-center p-8 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="16" fill="#7c3aed"/>
                <path d="M10 16.5L14 20.5L22 12.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center">Daha fazla bilgi ve iletişim için</h2>
            </div>
            <p className="text-violet-200 text-center mb-6 font-mono">R10 profilime göz atabilirsiniz</p>
            <a
              href="https://www.r10.net/profil/205411-henoxdev.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-7 py-3 rounded-xl bg-black border border-violet-900 text-violet-200 font-semibold text-lg shadow-lg hover:bg-violet-900 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-400"
            >
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-2c0-2.66-5.33-4-8-4Z"/></svg>
              R10 Profilime Git
            </a>
          </div>
        </div>
        <footer className="w-full border-t border-neutral-800 bg-black py-6 flex flex-col md:flex-row md:items-center md:justify-between items-center justify-center px-4 md:px-16 gap-4 md:gap-0 text-center mt-auto">
          <span className="text-xs text-white block mb-2 md:mb-0">
            Copyright © 2025 henoxdev
          </span>
          <div className="flex gap-6 text-2xl justify-center">
            <a href="#" className="text-white hover:text-white transition" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" className="text-white hover:text-white transition" aria-label="YouTube"><FaYoutube /></a>
            <a href="#" className="text-white hover:text-white transition" aria-label="Tiktok"><FaTiktok /></a>
          </div>
        </footer>
      </div>
    </>
  )
} 
