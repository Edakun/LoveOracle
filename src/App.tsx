import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import LoveForm from './components/LoveForm'
import ResultCard from './components/ResultCard'
import { calculateCompatibility } from './utils/loveCalculator'
import type { CompatibilityResult } from './types'

const App = () => {
  const [result, setResult] = useState<CompatibilityResult | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [hearts, setHearts] = useState<{ id: number; left: string; duration: number }[]>([])

  // イースターエッグ用のキーリスナー
  useEffect(() => {
    let typedKeys = ''
    const keyListener = (e: KeyboardEvent) => {
      typedKeys += e.key.toLowerCase()
      // 最後の4文字だけを保持
      if (typedKeys.length > 4) {
        typedKeys = typedKeys.slice(-4)
      }
      
      // 「love」と入力されたらハートをフワフワ表示
      if (typedKeys === 'love') {
        createFloatingHearts()
        typedKeys = '' // リセット
      }
    }

    window.addEventListener('keydown', keyListener)
    return () => window.removeEventListener('keydown', keyListener)
  }, [])

  // フローティングハートのアニメーション用
  const createFloatingHearts = () => {
    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      left: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2
    }))
    setHearts([...hearts, ...newHearts])

    // 5秒後にハートを削除
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => !newHearts.find(h => h.id === heart.id)))
    }, 5000)
  }

  // 占い実行
  const calculateLove = (name1: string, birthdate1: Date, name2: string, birthdate2: Date) => {
    // 過去の日付かチェック
    const now = new Date()
    if (birthdate1 > now || birthdate2 > now) {
      toast.error('誕生日は過去の日付を入力してください')
      return
    }

    // 相性計算
    const compatibilityResult = calculateCompatibility(name1, birthdate1, name2, birthdate2)
    
    setResult(compatibilityResult)
    
    // アニメーション付きで結果を表示
    setShowResult(true)
  }

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <div className="gradient-bg min-h-[100vh] pt-8 pb-16 px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-medium text-love-red">LoveOracle</h1>
          <p className="text-gray-700 mt-2">二人の相性を占います</p>
        </header>

        {/* 入力フォーム */}
        <div className="max-w-md mx-auto glass-effect rounded-2xl p-6 shadow-lg">
          <LoveForm onSubmit={calculateLove} />
        </div>

        {/* 結果表示 */}
        {showResult && result && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto mt-8"
          >
            <ResultCard result={result} />
          </motion.div>
        )}

        {/* フッター */}
        <footer className="text-center text-sm text-gray-600 mt-12">
          <p> {new Date().getFullYear()} LoveOracle</p>
          <a 
            href="https://github.com/Edakun/LoveOracle" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-love-red hover:underline inline-flex items-center mt-1"
          >
            <Heart size={14} className="mr-1" />
            GitHub
          </a>
        </footer>
      </div>

      {/* イースターエッグのフローティングハート */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: heart.left,
            bottom: '0',
            color: '#FF4D4F',
            animationDuration: `${heart.duration}s`
          }}
        >
          <Heart fill="#FFB6C1" stroke="#FF4D4F" size={Math.random() * 20 + 10} />
        </div>
      ))}
    </div>
  )
}

export default App
