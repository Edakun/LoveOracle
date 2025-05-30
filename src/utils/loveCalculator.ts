import dayjs from 'dayjs'
import type { CompatibilityResult } from '../types'

// コメントテーブルの型定義
type CommentTable = {
  [key: number]: string[]
}

// 相性スコアに基づくコメントテーブル
const COMMENT_TABLE: CommentTable = {
  90: [
    "運命に導かれた2人。この出会いは星々が用意した特別な贈り物です。",
    "魂の共鳴を感じる相性。2人で過ごす時間はまるで魔法のよう。",
    "宝石のように輝く特別な絆があります。大切に育んでください。"
  ],
  70: [
    "惹かれ合う磁石のような引力。お互いの良さを引き出し合える関係です。",
    "心地よい調和を感じる相性。共に歩む道は明るく照らされています。",
    "互いの違いを理解し、補い合える素敵な関係性。"
  ],
  50: [
    "ゆっくりと育む穏やかな関係。時間が2人の絆を深めていくでしょう。",
    "バランスのとれた安定した相性。努力次第で関係は深まります。",
    "互いを尊重し理解することで、素晴らしい関係に育つ可能性があります。"
  ],
  30: [
    "少し距離感のある関係。互いの違いを認め合うことが鍵となります。",
    "理解し合うには時間と忍耐が必要かもしれません。焦らずに。",
    "波長が合う時と合わない時があるでしょう。コミュニケーションを大切に。"
  ],
  0: [
    "対照的な性質を持つ2人。時に難しさを感じるかもしれません。",
    "挑戦的な相性ですが、互いを尊重することで関係は育ちます。",
    "異なる世界観を持つ2人。新たな視点を見つける旅になるでしょう。"
  ]
}

// 今日の恋愛運メッセージ
const HOROSCOPE_MESSAGES = {
  '良い': [
    "素敵な出会いや進展があるかも。積極的な行動が実りをもたらします。",
    "心が軽やかに感じる一日。愛情表現が相手に伝わりやすい日です。",
    "周囲からのサポートを感じられる日。自信を持って前に進みましょう。"
  ],
  '普通': [
    "バランスの良い一日。無理せず自然体で過ごすのがおすすめです。",
    "平穏な恋愛運。特別なことはなくても、安定感を感じられるでしょう。",
    "日常の小さな幸せを大切にする日。感謝の気持ちが運気を高めます。"
  ],
  '注意': [
    "誤解が生じやすい日。言葉選びに注意し、思いやりを忘れずに。",
    "少し感情が揺れやすい時期。深呼吸して冷静さを保ちましょう。",
    "期待しすぎないことが大切な日。ありのままの状況を受け入れて。"
  ]
}

/**
 * 相性スコアを計算する関数
 */
export const calculateCompatibility = (name1: string, birthdate1: Date, name2: string, birthdate2: Date): CompatibilityResult => {
  // 日付をYYYY、MM、DDに分解
  const date1 = dayjs(birthdate1)
  const date2 = dayjs(birthdate2)
  
  const year1 = date1.year()
  const month1 = date1.month() + 1 // 0-indexedなので+1
  const day1 = date1.date()
  
  const year2 = date2.year()
  const month2 = date2.month() + 1
  const day2 = date2.date()
  
  // 仕様に基づいた計算式
  const a = (year1 + month1 + day1) % 50
  const b = (year2 + month2 + day2) % 50
  const score = ((a + b) * 2) % 101 // 0-100の範囲
  
  // コメント選択
  let commentCategory = 0
  if (score >= 90) commentCategory = 90
  else if (score >= 70) commentCategory = 70
  else if (score >= 50) commentCategory = 50
  else if (score >= 30) commentCategory = 30
  else commentCategory = 0
  
  // ランダムコメント選択（同じ点数なら同じコメントになるよう固定）
  const commentIndex = score % COMMENT_TABLE[commentCategory].length
  const comment = COMMENT_TABLE[commentCategory][commentIndex]
  
  // 今日の恋愛運を計算
  const horoscope1 = getLoveHoroscope(name1, birthdate1)
  const horoscope2 = getLoveHoroscope(name2, birthdate2)
  
  return {
    name1,
    name2,
    score,
    comment,
    horoscope1,
    horoscope2
  }
}

/**
 * 今日の恋愛運を計算する関数
 * 重み付きランダム（良い:40%、普通:45%、注意:15%）
 * 日付+名前でシード値を作成し、一日中同じ結果を返すように
 */
export const getLoveHoroscope = (name: string, birthdate: Date) => {
  // 今日の日付を取得してYYYYMMDD形式に
  const today = dayjs().format('YYYYMMDD')
  // 名前と誕生日を組み合わせてシード値を作成
  const seed = today + name + dayjs(birthdate).format('YYYYMMDD')
  // シンプルなハッシュ関数（文字コードの合計）
  let hashValue = 0
  for (let i = 0; i < seed.length; i++) {
    hashValue += seed.charCodeAt(i)
  }
  
  // 0-99の数値に変換
  const randomValue = hashValue % 100
  
  // 重み付き抽選
  let status: '良い' | '普通' | '注意'
  if (randomValue < 40) { // 40%
    status = '良い'
  } else if (randomValue < 85) { // 45%
    status = '普通'
  } else { // 15%
    status = '注意'
  }
  
  // メッセージをランダムに選択（同じ名前+日付なら同じメッセージ）
  const messageIndex = hashValue % HOROSCOPE_MESSAGES[status].length
  const message = HOROSCOPE_MESSAGES[status][messageIndex]
  
  return {
    name,
    status,
    message
  }
}
