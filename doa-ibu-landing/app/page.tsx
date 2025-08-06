'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Play, Mic, Bell, Users, Download, Smartphone, Star } from 'lucide-react'
import Image from "next/image"
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function DoaIbuLanding() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const particlesRef = useRef<THREE.Points>()

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    rendererRef.current = renderer
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    // Create floating hearts particles
    const heartGeometry = new THREE.BufferGeometry()
    const heartCount = 100
    const positions = new Float32Array(heartCount * 3)
    const colors = new Float32Array(heartCount * 3)
    const sizes = new Float32Array(heartCount)

    for (let i = 0; i < heartCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20

      // Pink to rose gradient colors
      colors[i * 3] = Math.random() * 0.5 + 0.5     // R
      colors[i * 3 + 1] = Math.random() * 0.3        // G
      colors[i * 3 + 2] = Math.random() * 0.5 + 0.5  // B

      sizes[i] = Math.random() * 3 + 1
    }

    heartGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    heartGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    heartGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const heartMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    })

    const particles = new THREE.Points(heartGeometry, heartMaterial)
    particlesRef.current = particles
    scene.add(particles)

    // Create floating rings
    const ringGeometry = new THREE.RingGeometry(1, 1.2, 32)
    const ringMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xff69b4, 
      transparent: true, 
      opacity: 0.3,
      side: THREE.DoubleSide
    })

    for (let i = 0; i < 5; i++) {
      const ring = new THREE.Mesh(ringGeometry, ringMaterial)
      ring.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      )
      ring.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )
      scene.add(ring)
    }

    camera.position.z = 10

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.002
        particlesRef.current.rotation.x += 0.001

        // Animate particle positions
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.01
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true
      }

      // Animate rings
      scene.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.RingGeometry) {
          child.rotation.x += 0.01
          child.rotation.y += 0.005
          child.position.y += Math.sin(Date.now() * 0.001 + index) * 0.02
        }
      })

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 relative overflow-hidden">
      {/* Three.js Background */}
      <div ref={mountRef} className="fixed inset-0 z-0" />
      
      {/* Animated Background Overlay */}
      <div className="fixed inset-0 z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-rose-500/20 animate-pulse" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-20">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3 group">
              <Image 
                src="/logo-doa-ibu.png" 
                alt="Doa Ibu Logo" 
                width={120} 
                height={40}
                className="group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300" asChild>
              <a href="https://drive.google.com/file/d/1rffeqaFnGo8E_FPDrfaEPppDBqGOye9p/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                <Download className="w-5 h-5 mr-2" />
                Download App
              </a>
            </Button>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="mb-8 animate-fade-in-up">
            <div className="inline-block bg-gradient-to-r from-pink-500/20 to-rose-500/20 backdrop-blur-sm border border-pink-300/30 rounded-full px-6 py-3 mb-8">
              <span className="text-pink-200 font-medium">🙏 Segera Hadir di Play Store</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-pink-200 via-rose-200 to-purple-200 bg-clip-text text-transparent animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Doa, Pesan Cinta,
            <br />
            dan Suara dari
            <br />
            <span className="text-6xl md:text-8xl bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent animate-pulse">
              Ibu Tersayang
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-pink-100 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Aplikasi yang menyajikan doa dan suara penuh kasih dari Ibu, yang bisa diputar kapan saja untuk memberikan ketenangan dan kekuatan dalam hidup Anda.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-bold text-xl px-10 py-5 rounded-full shadow-2xl hover:shadow-pink-500/25 transform hover:scale-105 transition-all duration-300" asChild>
              <a href="https://drive.google.com/file/d/1rffeqaFnGo8E_FPDrfaEPppDBqGOye9p/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                <Download className="w-6 h-6 mr-3" />
                Download Gratis
              </a>
            </Button>
            <Button size="lg" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 font-bold text-xl px-10 py-5 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300" asChild>
              <a href="https://drive.google.com/file/d/1rffeqaFnGo8E_FPDrfaEPppDBqGOye9p/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                <Play className="w-6 h-6 mr-3" />
                Lihat Demo
              </a>
            </Button>
          </div>

          {/* App Screenshots with 3D effect */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            {[
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-05%20at%2013.20.05_17d63aad.jpg-H7vt2KssBSI4GWzgRfiLULGffSjVyh.jpeg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-05%20at%2013.20.22_746ec4ae.jpg-vl6D0XZQuTG5KVGnfSpgrHIFWMiHtM.jpeg", 
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-05%20at%2013.20.13_4ef69941.jpg-UkpGqVdmqnw57vw6hVeml7ZJ9nR0Hg.jpeg",
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-05%20at%2013.19.55_7d4a293b.jpg-sWo96cqJnjAGWJktY0uNyb5qPMNjaN.jpeg"
            ].map((src, index) => (
              <Card key={index} className="overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl hover:shadow-pink-500/25 transform hover:scale-105 hover:rotate-2 transition-all duration-500 group">
                <CardContent className="p-0">
                  <Image 
                    src={src || "/placeholder.svg"}
                    alt={`Doa Ibu Screenshot ${index + 1}`}
                    width={300} 
                    height={600} 
                    className="w-full h-auto group-hover:scale-110 transition-transform duration-500"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Section with Floating Cards */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-200 to-rose-200 bg-clip-text text-transparent">
                Fitur Utama Aplikasi
              </h2>
              <p className="text-xl md:text-2xl text-pink-100 max-w-3xl mx-auto">
                Semua yang Anda butuhkan untuk merasakan kehangatan doa dan kasih sayang Ibu
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Play,
                  title: "🎧 Putar Doa Ibu",
                  description: "Audio harian dari Ibu, baik bawaan sistem maupun rekaman pribadi yang bisa diputar kapan saja",
                  delay: "0s"
                },
                {
                  icon: Users,
                  title: "👩‍👦 Profil Ibu", 
                  description: "Simpan nama, foto, dan data suara dari Ibu dalam profil personal yang aman",
                  delay: "0.2s"
                },
                {
                  icon: Mic,
                  title: "🎙 Rekam Suara Ibu",
                  description: "Fitur untuk merekam doa langsung dari Ibu dan menyimpannya sebagai kenangan berharga",
                  delay: "0.4s"
                },
                {
                  icon: Bell,
                  title: "🔔 Reminder Harian",
                  description: "Notifikasi harian: 'Sudah dengar doa dari Ibu hari ini?' untuk menjaga koneksi spiritual",
                  delay: "0.6s"
                }
              ].map((feature, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 shadow-2xl hover:shadow-pink-500/25 group animate-float" style={{ animationDelay: feature.delay }}>
                  <CardContent className="text-center space-y-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      <feature.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                    <p className="text-pink-100 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials with Animated Cards */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-200 to-rose-200 bg-clip-text text-transparent">
                Apa Kata Pengguna
              </h2>
              <p className="text-xl md:text-2xl text-pink-100">
                Cerita dari mereka yang merasakan kehangatan doa Ibu
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sari Dewi",
                  role: "Perantau di Jakarta",
                  text: "Aplikasi ini benar-benar menyentuh hati. Setiap kali mendengar suara Ibu berdoa, rasanya seperti dipeluk hangat dari jauh.",
                  initial: "S"
                },
                {
                  name: "Ahmad Rizki", 
                  role: "Mahasiswa",
                  text: "Fitur rekam suara sangat membantu. Sekarang saya bisa menyimpan doa Ibu dan mendengarkannya kapan saja saat butuh kekuatan.",
                  initial: "A"
                },
                {
                  name: "Linda Sari",
                  role: "Ibu Rumah Tangga", 
                  text: "Reminder hariannya sangat membantu saya untuk selalu ingat mendengarkan doa. Aplikasi yang sangat bermakna!",
                  initial: "L"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-pink-500/25 group animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                    <p className="text-pink-100 italic text-lg leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {testimonial.initial}
                      </div>
                      <div>
                        <p className="font-bold text-white">{testimonial.name}</p>
                        <p className="text-pink-200">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-rose-600/20 backdrop-blur-sm" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
              Rasakan Kehangatan Doa Ibu
            </h2>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-pink-100 leading-relaxed">
              Mulai perjalanan spiritual Anda hari ini. Download aplikasi Doa Ibu dan rasakan kedamaian dalam setiap doa.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-bold text-xl px-12 py-6 rounded-full shadow-2xl hover:shadow-pink-500/50 transform hover:scale-110 transition-all duration-300" asChild>
                <a href="https://drive.google.com/file/d/1rffeqaFnGo8E_FPDrfaEPppDBqGOye9p/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <Smartphone className="w-6 h-6 mr-3" />
                  Download APK
                </a>
              </Button>
              <Button size="lg" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 font-bold text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300">
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Image 
                    src="/logo-doa-ibu.png" 
                    alt="Doa Ibu Logo" 
                    width={100} 
                    height={35}
                    className="brightness-0 invert"
                  />
                </div>
                <p className="text-pink-200">
                  Menghubungkan hati dengan doa dan kasih sayang Ibu
                </p>
              </div>
              
              <div>
                <h4 className="font-bold mb-4 text-white">Legal</h4>
                <ul className="space-y-2 text-pink-200">
                  <li><a href="/privacy" className="hover:text-white transition-colors cursor-pointer">Kebijakan Privasi</a></li>
                  <li><a href="/terms" className="hover:text-white transition-colors cursor-pointer">Syarat & Ketentuan</a></li>
                  <li><a href="/policy" className="hover:text-white transition-colors cursor-pointer">Kebijakan Aplikasi</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-white/10 mt-12 pt-8 text-center text-pink-200">
              <p>&copy; 2025 Doa Ibu. Dibuat dengan ❤️ untuk menghubungkan hati dengan doa Ibu.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
