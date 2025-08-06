import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Settings, Smartphone, Cloud, Heart } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

export default function AppPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <Image 
              src="/logo-doa-ibu.png" 
              alt="Doa Ibu Logo" 
              width={120} 
              height={40}
              className="group-hover:scale-110 transition-transform duration-300"
            />
          </Link>
          <Link href="/">
            <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-semibold px-6 py-3 rounded-full">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Kembali
            </Button>
          </Link>
        </nav>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Settings className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-200 to-rose-200 bg-clip-text text-transparent">
              Kebijakan Aplikasi
            </h1>
            <p className="text-xl text-pink-100">
              Terakhir diperbarui: 6 Agustus 2025
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl">
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Heart className="w-6 h-6 mr-3 text-pink-400" />
                  Tujuan Aplikasi
                </h2>
                <div className="text-pink-100 space-y-4">
                  <p>
                    Aplikasi Doa Ibu dikembangkan dengan tujuan mulia untuk:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Menghubungkan anak dengan doa dan kasih sayang ibu</li>
                    <li>Menyediakan platform untuk menyimpan pesan spiritual pribadi</li>
                    <li>Membantu menjaga tradisi doa dalam keluarga</li>
                    <li>Memberikan ketenangan dan kekuatan spiritual</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Smartphone className="w-6 h-6 mr-3 text-pink-400" />
                  Persyaratan Sistem
                </h2>
                <div className="text-pink-100 space-y-4">
                  <p>
                    Untuk pengalaman optimal, aplikasi memerlukan:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Android 6.0 (API level 23) atau lebih tinggi</li>
                    <li>Ruang penyimpanan minimal 100 MB</li>
                    <li>Koneksi internet untuk fitur cloud dan premium</li>
                    <li>Izin akses mikrofon untuk fitur rekam suara</li>
                    <li>Izin notifikasi untuk pengingat harian</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Fitur Gratis vs Premium
                </h2>
                <div className="text-pink-100 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 p-4 rounded-lg">
                      <h3 className="font-bold text-white mb-3">Fitur Gratis</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Doa bawaan sistem (offline)</li>
                        <li>2 rekaman pribadi</li>
                        <li>Reminder harian basic</li>
                        <li>Profil dasar</li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-r from-pink-500/20 to-rose-500/20 p-4 rounded-lg border border-pink-400/30">
                      <h3 className="font-bold text-white mb-3">Fitur Premium</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Koleksi audio eksklusif</li>
                        <li>30 rekaman pribadi</li>
                        <li>Musik latar & tema premium</li>
                        <li>Notifikasi personal</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Cloud className="w-6 h-6 mr-3 text-pink-400" />
                  Penyimpanan Data
                </h2>
                <div className="text-pink-100 space-y-4">
                  <p>
                    Aplikasi menggunakan sistem penyimpanan hybrid:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Lokal:</strong> Doa bawaan sistem dan cache audio</li>
                    <li><strong>Cloud:</strong> Rekaman pribadi dan pengaturan akun</li>
                    <li><strong>Enkripsi:</strong> Semua data pribadi dienkripsi end-to-end</li>
                    <li><strong>Backup:</strong> Sinkronisasi otomatis untuk pengguna premium</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Kebijakan Konten
                </h2>
                <div className="text-pink-100 space-y-4">
                  <p>
                    Semua konten dalam aplikasi harus:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Bersifat positif dan membangun spiritual</li>
                    <li>Tidak mengandung unsur SARA atau kebencian</li>
                    <li>Menghormati nilai-nilai keluarga dan agama</li>
                    <li>Tidak melanggar hak cipta atau privasi orang lain</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Pembaruan Aplikasi
                </h2>
                <div className="text-pink-100 space-y-4">
                  <p>
                    Kami secara berkala merilis pembaruan untuk:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Menambah fitur baru dan konten spiritual</li>
                    <li>Memperbaiki bug dan meningkatkan performa</li>
                    <li>Meningkatkan keamanan dan privasi</li>
                    <li>Menyesuaikan dengan standar platform terbaru</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Dukungan Pengguna
                </h2>
                <div className="text-pink-100 space-y-4">
                  <p>
                    Kami menyediakan dukungan melalui:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>FAQ dalam aplikasi</li>
                    <li>Email support: support@doaibu.app</li>
                    <li>Panduan penggunaan dan tutorial</li>
                    <li>Komunitas pengguna untuk berbagi pengalaman</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Kontak
                </h2>
                <div className="text-pink-100">
                  <p>
                    Untuk pertanyaan tentang kebijakan aplikasi:
                  </p>
                  <p className="mt-2 font-semibold">
                    Email: policy@doaibu.app
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
