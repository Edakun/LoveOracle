import { useState } from 'react'
import { Heart, Copy, Check } from 'lucide-react'
import { CompatibilityResult } from '../types'
import toast from 'react-hot-toast'

interface ResultCardProps {
  result: CompatibilityResult
}

const ResultCard = ({ result }: ResultCardProps) => {
  const [copied, setCopied] = useState(false)

  // ステータスに応じた色を返す関数
  const getStatusColor = (status: '良い' | '普通' | '注意') => {
    switch (status) {
      case '良い':
        return 'text-green-500'
      case '普通':
        return 'text-blue-500'
      case '注意':
        return 'text-orange-500'
      default:
        return 'text-gray-500'
    }
  }

  // 結果をシェアする機能
  const handleShare = () => {
    // シェアテキストを生成
    const shareText = `💖${result.name1}×${result.name2} 相性${result.score}% – ${result.comment} #LoveOracle`
    
    // クリップボードにコピー
    navigator.clipboard.writeText(shareText)
      .then(() => {
        setCopied(true)
        toast.success('結果をコピーしました！')
        
        // 3秒後にコピー状態をリセット
        setTimeout(() => setCopied(false), 3000)
      })
      .catch(() => {
        toast.error('コピーに失敗しました')
      })
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
      {/* 結果ヘッダー */}
      <div className="bg-love-lavender px-6 py-4 text-center">
        <h3 className="text-xl font-medium text-gray-800">相性占い結果</h3>
        <div className="flex items-center justify-center mt-2 gap-2 text-love-red">
          <span>{result.name1}</span>
          <Heart fill="#FFB6C1" size={20} />
          <span>{result.name2}</span>
        </div>
      </div>

      {/* スコア表示 */}
      <div className="px-6 py-8 text-center">
        <div className="mb-4">
          <span className="text-5xl font-medium text-love-red">{result.score}%</span>
        </div>
        <p className="text-gray-700 italic">{result.comment}</p>
      </div>

      {/* 今日の恋愛運 */}
      <div className="px-6 py-4 border-t border-gray-200">
        <h4 className="text-center text-lg font-medium text-gray-800 mb-3">今日の恋愛運</h4>
        
        <div className="grid grid-cols-2 gap-4">
          {/* 1人目の恋愛運 */}
          <div className="p-3 bg-love-lavender bg-opacity-30 rounded-lg">
            <div className="font-medium text-gray-800">{result.horoscope1.name}</div>
            <div className={`text-lg font-medium ${getStatusColor(result.horoscope1.status)}`}>
              {result.horoscope1.status}
            </div>
            <p className="text-sm text-gray-600 mt-1">{result.horoscope1.message}</p>
          </div>

          {/* 2人目の恋愛運 */}
          <div className="p-3 bg-love-lavender bg-opacity-30 rounded-lg">
            <div className="font-medium text-gray-800">{result.horoscope2.name}</div>
            <div className={`text-lg font-medium ${getStatusColor(result.horoscope2.status)}`}>
              {result.horoscope2.status}
            </div>
            <p className="text-sm text-gray-600 mt-1">{result.horoscope2.message}</p>
          </div>
        </div>
      </div>

      {/* シェアボタン */}
      <div className="px-6 py-4 bg-gray-50 text-center">
        <button
          onClick={handleShare}
          className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-love-pink hover:bg-opacity-80 text-white transition-colors"
        >
          {copied ? (
            <>
              <Check size={16} className="mr-2" />
              コピー完了！
            </>
          ) : (
            <>
              <Copy size={16} className="mr-2" />
              結果をシェア
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default ResultCard
