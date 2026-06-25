import type { CoffeeNote } from '@/types';

const daysAgo = (n: number): string => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
};

export const SAMPLE_NOTES: CoffeeNote[] = [
  {
    id: 'sample-1',
    shopName: '蓝瓶子咖啡',
    city: '上海',
    beanType: '手冲',
    rating: 5,
    feelings:
      '耶加雪菲的豆子，花香非常明显，柑橘和茉莉的香气在口中展开，尾韵是淡淡的蜂蜜甜。店内环境很安静，木质装修让人放松，适合坐一下午看书。手冲台的小哥很专业，还分享了这支豆子的冲煮参数。',
    createdAt: daysAgo(2),
  },
  {
    id: 'sample-2',
    shopName: 'Manner Coffee',
    city: '北京',
    beanType: '意式',
    rating: 4,
    feelings:
      '一杯冰拿铁带走，豆子深烘，焦香和巧克力风味很浓，奶泡绵密。性价比超高，排队也快。店小但出杯效率高，上班族早上来一杯刚刚好。',
    createdAt: daysAgo(5),
  },
  {
    id: 'sample-3',
    shopName: 'Seesaw Coffee',
    city: '成都',
    beanType: '冷萃',
    rating: 4,
    feelings:
      '栀子花冷萃，创意风味做得不错，花香和咖啡的融合度很高，不会太甜。夏天喝特别清爽，冰块化了之后味道也不会太水。店面设计是年轻感的工业风，拍照好看。',
    createdAt: daysAgo(9),
  },
];
