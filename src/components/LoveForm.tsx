import { useState } from 'react'
import dayjs from 'dayjs'
import { Heart } from 'lucide-react'

interface LoveFormProps {
  onSubmit: (name1: string, birthdate1: Date, name2: string, birthdate2: Date) => void
}

const LoveForm = ({ onSubmit }: LoveFormProps) => {
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [birthdate1, setBirthdate1] = useState('')
  const [birthdate2, setBirthdate2] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 入力値の検証
    if (!name1 || !name2 || !birthdate1 || !birthdate2) {
      return
    }

    // 日付をパース
    const date1 = dayjs(birthdate1).toDate()
    const date2 = dayjs(birthdate2).toDate()
    
    // 親コンポーネントに送信
    onSubmit(name1, date1, name2, date2)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 最初の人の情報 */}
      <div>
        <h3 className="text-lg font-medium text-gray-800">1人目</h3>
        <div className="mt-2">
          <label htmlFor="name1" className="block text-sm text-gray-600 mb-1">
            名前
          </label>
          <input
            type="text"
            id="name1"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-love-pink"
            placeholder="名前を入力"
            required
          />
        </div>
        <div className="mt-2">
          <label htmlFor="birthdate1" className="block text-sm text-gray-600 mb-1">
            誕生日
          </label>
          <input
            type="date"
            id="birthdate1"
            value={birthdate1}
            onChange={(e) => setBirthdate1(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-love-pink"
            required
          />
        </div>
      </div>

      {/* 2人目の情報 */}
      <div>
        <h3 className="text-lg font-medium text-gray-800">2人目</h3>
        <div className="mt-2">
          <label htmlFor="name2" className="block text-sm text-gray-600 mb-1">
            名前
          </label>
          <input
            type="text"
            id="name2"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-love-pink"
            placeholder="名前を入力"
            required
          />
        </div>
        <div className="mt-2">
          <label htmlFor="birthdate2" className="block text-sm text-gray-600 mb-1">
            誕生日
          </label>
          <input
            type="date"
            id="birthdate2"
            value={birthdate2}
            onChange={(e) => setBirthdate2(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-love-pink"
            required
          />
        </div>
      </div>

      {/* 送信ボタン */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full bg-love-red hover:bg-opacity-90 text-white font-medium py-3 rounded-lg flex items-center justify-center transition-colors"
        >
          <Heart className="mr-2" size={20} />
          占う❤️
        </button>
      </div>
    </form>
  )
}

export default LoveForm
