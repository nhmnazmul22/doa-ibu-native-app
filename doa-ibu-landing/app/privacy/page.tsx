import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Shield, Eye, Lock, Database } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

export default function PrivacyPolicy() {
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
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-200 to-rose-200 bg-clip-text text-transparent">
              Kebijakan Privasi
            </h1>
            <p className="text-xl text-pink-100">
              Terakhir diperbarui: 6 Agustus 2025
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl">
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Eye className="w-6 h-6 mr-3 text-pink-400" />
                  Informasi yang Kami Kumpulkan
                </h2>
                <div className="text-pink-100 space-y-4">
                  <p>
                    Aplikasi Doa Ibu mengumpulkan informasi berikut untuk memberikan layanan terbaik:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Informasi profil pengguna (nama, email, foto profil)</li>
                    <li>Rekaman audio doa yang Anda simpan</li>
                    <li>Preferensi notifikasi dan pengaturan aplikasi</li>
                    <li>Data penggunaan aplikasi untuk meningkatkan layanan</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Database className="w-6 h-6 mr-3 text-pink-400" />
                  Bagaimana Kami Menggunakan Informasi
                </h2>
                <div className="text-pink-100 space-y-4">
                  <p>
                    Informasi yang dikumpulkan digunakan untuk:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Menyediakan dan memelihara layanan aplikasi</li>
                    <li>Menyimpan dan mengelola rekaman audio pribadi Anda</li>
                    <li>Mengirimkan notifikasi sesuai preferensi Anda</li>
                    <li>Meningkatkan fitur dan pengalaman pengguna</li>
                    <li>Memberikan dukungan teknis</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Lock className="w-6 h-6 mr-3 text-pink-400" />
                  Keamanan Data
                </h2>
                <div className="text-pink-100 space-y-4">
                  <p>
                    Kami berkomitmen melindungi data pribadi Anda dengan:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Enkripsi data saat transmisi dan penyimpanan</li>
                    <li>Akses terbatas hanya untuk personel yang berwenang</li>
                    <li>Pemantauan keamanan sistem secara berkala</li>
                    <li>Backup data yang aman dan terenkripsi</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Hak Pengguna
                </h2>
                <div className="text-pink-100 space-y-4">
                  <p>
                    Anda memiliki hak untuk:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Mengakses data pribadi yang kami simpan</li>
                    <li>Memperbarui atau mengoreksi informasi pribadi</li>
                    <li>Menghapus akun dan data pribadi</li>
                    <li>Membatasi penggunaan data tertentu</li>
                    <li>Memindahkan data ke layanan lain</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Kontak
                </h2>
                <div className="text-pink-100">
                  <p>
                    Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami di:
                  </p>
                  <p className="mt-2 font-semibold">
                    Email: privacy@doaibu.app
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
