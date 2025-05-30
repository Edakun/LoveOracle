// 相性占いの結果の型定義
export interface CompatibilityResult {
  name1: string;
  name2: string;
  score: number;
  comment: string;
  horoscope1: {
    name: string;
    status: '良い' | '普通' | '注意';
    message: string;
  };
  horoscope2: {
    name: string;
    status: '良い' | '普通' | '注意';
    message: string;
  };
}
